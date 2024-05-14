import { NextFunction } from "express";
import { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { DecodedUserData } from "../../@types";

export function middlewareAuth(
  req: FastifyRequest,
  reply: FastifyReply,
  next: NextFunction,

) {
  console.log(req.routeOptions.url);

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new Error("Erro de authenticação");
  }

  const token = authorizationHeader.split(" ")[1];

  verify(token, `${process.env.TOKEN}`, (err, decoded: any) => {
    if (err) {
      throw new Error("Erro de authenticação no token");
    }

    if (decoded.email != process.env.ADMIN_EMAIL_ONE) {
      throw new Error("Erro de acesso");
    }

    req.user = decoded as DecodedUserData;
  });

  next();
}
