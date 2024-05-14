import { FastifyInstance, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { middlewareAuth } from "../../middleware/authenticated";

export async function deleteSignature(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/signature/delete/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;

        await prisma.services.delete({
          where: {
            id: id,
          },
        });

        reply.send(205).send({ response: "Assinatura deletada" });
      } catch (error) {
        console.log(error);

        throw new Error("Error na criação de serviço");
      }
    }
  ).decorate("@route", middlewareAuth);
}
