// generate-ai-completion.ts
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { streamText, pipeTextStreamToResponse } from "ai";
import { z } from "zod";
import { groqProvider } from "../lib/ai";

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, template, temperature } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: { id: videoId },
    });

    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: "Video transcription was not generated yet." });
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    try {
      const { textStream } = await streamText({
        model: groqProvider("llama3-70b-8192"),
        temperature,
        messages: [{ role: "user", content: promptMessage }],
      });

      pipeTextStreamToResponse({
        textStream,
        response: reply.raw,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
      });
    } catch (error) {
      console.error("Erro ao chamar a API da Groq:", error);
      return reply.status(500).send({ error: "Falha ao comunicar com a IA." });
    }
  });
}
