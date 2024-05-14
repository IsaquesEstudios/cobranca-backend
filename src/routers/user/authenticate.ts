import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { middlewareAuth } from "../../middleware/authenticated";

export async function authenticateUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/user/authenticate",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;

      console.log("chamou")

      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!findUser) {
        throw new Error("Erro de authenticação");
      }

      const comparePassWord = await compare(password, findUser?.password);

      const token = sign(
        { user: findUser.name, email: findUser.email },
        `${process.env.TOKEN}`,
        {
          expiresIn: 60 * 60 * 24 * 15,
        }
      );
      const refreshToken = sign(
        { user: findUser.name, email: findUser.email },
        `${process.env.REFRESH_TOKEN}`,
        {
          expiresIn: 60 * 60 * 24 * 15,
        }
      );

      if (!comparePassWord) {
        throw new Error("Erro de authenticação");
      }

      reply.code(201).send({
        user: {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          token: token,
          refresh_token: refreshToken,
        },
      });
    }
  )
}
