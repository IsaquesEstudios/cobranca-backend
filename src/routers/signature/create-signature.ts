import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { middlewareAuth } from "../../middleware/authenticated";

export async function createSignature(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/signature/create",
    {
      schema: {
        body: z.object({
          title: z.string(),
          description: z.string(),
          value: z.string(),
          tags: z.array(z.string()),
          pay_day: z.number().gte(1).lte(28),
          debtor_id: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { title, description, value, pay_day, tags, debtor_id } =
          request.body;

        const createService = await prisma.services.create({
          data: {
            title: title,
            description: description,
            pay_day: pay_day,
            value: value,
            updated_at: new Date(),
            created_at: new Date(),
            debtor_id: debtor_id,
            tags: tags,
          },
        });

        reply.send(205).send({ createService });
      } catch (error) {
        console.log(error);

        throw new Error("Error na criação de serviço");
      }
    }
  ).decorate("@route", middlewareAuth);
}
