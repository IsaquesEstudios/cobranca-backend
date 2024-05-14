import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { middlewareAuth } from "../../middleware/authenticated";

export async function createUser(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post(
      "/user/create",
      {
        schema: {
          body: z.object({
            name: z.string(),
            email: z.string(),
            password: z
              .string()
              .min(3, { message: "Senha precisa ser maior que três dígitos" }),
          }),
        },
      },
      async (request, reply) => {
        const { name, email, password } = request.body;

        const findUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (findUser) {
          throw new Error("Usuário ou senha invalido");
        }

        const passwordHash: string = await hash(password, 10);
        const refreshToken = sign(
          { name, email },
          `${process.env.REFRESH_TOKEN}`
        );

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: passwordHash,
            refresh_token: refreshToken,
          },
        });

        reply.send({ user });
      }
    )
    .decorate("@route", middlewareAuth);
}
