import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { middlewareAuth } from "../../middleware/authenticated";

type signatureProps = {
  id: string;
  title: string;
  description: string;
  value: string;
  tags: string[];
  pay_day: number;
  updated_at: Date;
  created_at: Date;
  debtor_id: any;
  debtor: any;
};

export async function findAllSignature(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get(
      "/signature/all",
      async (request, reply) => {
        try {
          const findSignature = await prisma.services.findMany({
            include: {
              debtor: {
                select: {
                  name: true,
                },
              },
            },
          });

          const AllSignatureValue = await findSignature.map((item, _) => {
            return parseFloat(item.value);
          });

          const sum = AllSignatureValue.reduce(
            (acumulator, currentValue) => acumulator + currentValue,
            0
          );

          reply.send({ findSignature, totalValue: sum });
        } catch (error) {
          console.log(error);

          throw new Error("Error na criação de serviço");
        }
      }
    ).decorate("@route", middlewareAuth);
}
