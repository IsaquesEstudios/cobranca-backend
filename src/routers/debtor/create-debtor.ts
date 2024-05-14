import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { middlewareAuth } from "../../middleware/authenticated";

export async function createDebtor(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/debtor/create",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          services: z.any(),
          id_payment: z.string().optional(),
        }),
        response: {
          201: z.object({
            debtor: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              services: z.any(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, services, id_payment } = request.body;

      const findDebtor = await prisma.debtor.findMany({
        where: {
          email,
        },
      });

      if (findDebtor.length > 0) {
        throw new Error("Usuário já existente");
      }

      const newDebtor = await prisma.debtor.create({
        data: {
          name,
          email,
          services,
        },
      });

      reply.status(201).send({
        debtor: newDebtor,
      });
    }
  ).decorate("@route", middlewareAuth);
}
