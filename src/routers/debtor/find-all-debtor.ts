import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { middlewareAuth } from "../../middleware/authenticated";

export async function findAllDebtor(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/debtor/find-all",
    {
      schema: {
        querystring: z.object({
          query: z.any(),
          pageIndex: z.string().nullish().default("1").transform(Number),
        }),
        headers: z.object({
          
        })
      },
    },
    async (request, reply) => {
      const { query, pageIndex } = request.query;

      const findMany = await prisma.debtor.findMany({
        where: {
          email: query,
        },
      });

  

      reply.send({ findMany });
    }
  ).decorate("@route", middlewareAuth);
}
