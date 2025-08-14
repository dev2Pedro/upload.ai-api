import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { generateText } from "ai";
import { groqProvider } from "../lib/ai";

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (req, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, prompt, temperature } = bodySchema.parse(req.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: { id: videoId },
    });

    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: "Video transcription was not generated yet." });
    }

    const promptMessage = prompt.replace(
      "{transcription}",
      video.transcription
    );

    try {
      const result = await generateText({
        model: groqProvider("llama3-70b-8192"),
        temperature,
        prompt: promptMessage,
      });

      return reply.send({
        result: result.text,
      });
    } catch (error) {
      console.error("Erro ao chamar a API da Groq:", error);
      return reply.status(500).send({ error: "Falha ao comunicar com a IA." });
    }
  });
}
