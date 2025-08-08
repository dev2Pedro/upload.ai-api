import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { createReadStream } from "node:fs";
import { z } from "zod";
import { groq } from "../lib/groq";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:videoId/transcription", async (req, reply) => {
    try {
      const paramsSchema = z.object({
        videoId: z.string().uuid(),
      });
      const { videoId } = paramsSchema.parse(req.params);

      const bodySchema = z.object({
        prompt: z.string().optional(),
      });
      const { prompt } = bodySchema.parse(req.body);

      const video = await prisma.video.findUniqueOrThrow({
        where: { id: videoId },
      });

      const audioReadStream = createReadStream(video.path);

      const response = await groq.audio.transcriptions.create({
        file: audioReadStream,
        model: "whisper-large-v3",
        response_format: "json",
        prompt: prompt || "",
      });

      return { text: response.text };
    } catch (error: any) {
      console.error("Erro na transcrição:", error);
      reply.status(500).send({
        error: "Falha na transcrição",
        details: error.message,
      });
    }
  });
}
