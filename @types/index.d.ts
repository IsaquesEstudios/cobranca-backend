import { FastifyRequest } from "fastify";

interface DecodedUserData {
  name: string;
  email: string;
}

declare global {
  namespace FastifyRequest {
    user: DecodedUserData;
  }
}

export { DecodedUserData };
