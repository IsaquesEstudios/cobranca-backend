import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { middlewareAuth } from "../../middleware/authenticated";

export async function editDebtor(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put(
      "/debtor/:debtorid",
      {
        schema: {
          params: z.object({
            debtorid: z.string(),
          }),
          body: z.object({
            name: z.string(),
            email: z.string(),
            id_payment: z.string(),
            services: z.any(),
          }),
        },
      },
      async (request, reply) => {
        const { debtorid } = request.params;
        const { name, email, id_payment, services } = request.body;

        const findDebtorById = await prisma.debtor.findUnique({
          where: {
            id: debtorid,
          },
        });

        if (findDebtorById === null) {
          throw new Error("Usuário não existe");
        }

        if (services) {
          const itemUpdate = await prisma.debtor.update({
            where: { id: debtorid },
            data: {
              updated_at: new Date().toISOString(),
              name: name,
              services: {
                create: {
                  title: services.title,
                  description: services.description,
                  value: services.value,
                  tags: services.tags,
                  pay_day: services.pay_at,
                },
              },
            },
          });

          reply.send(204).send({ teste: itemUpdate });
        } else {
          console.log("chamou");
          const itemUpdate = await prisma.debtor.update({
            where: { id: debtorid },
            data: {
              name: name,
              updated_at: new Date().toISOString(),
            },
          });

          reply.send(204).send({ teste: itemUpdate });
        }
      }
    )
    .decorate("@route", middlewareAuth);
}
