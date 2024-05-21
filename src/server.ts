import fastify from "fastify";
import { createDebtor } from "./routers/debtor/create-debtor";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { editDebtor } from "./routers/debtor/update-debtor";
import { findAllDebtor } from "./routers/debtor/find-all-debtor";
// import { editServices } from "./routers/signature/update-signature";
import { createUser } from "./routers/user/create-user";
import { authenticateUser } from "./routers/user/authenticate";
import fastifyJWT from "@fastify/jwt";
import { sendBillingEmail } from "./functions/send-billing-email";
import { createPaymentForService } from "./routers/create-payment-for-service";
import fastifyCors from "@fastify/cors";
import { createSignature } from "./routers/signature/create-signature";
import { findAllSignature } from "./routers/signature/find-all-signature";
import { deleteSignature } from "./routers/signature/delete-signature";
import { middlewareAuth } from "./middleware/authenticated";

const app = fastify();

app.register(fastifyJWT, {
  secret: `${process.env.TOKEN}`,
});

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(authenticateUser);

app.register(createSignature);
app.register(findAllSignature);
app.register(deleteSignature);

app.register(createDebtor);
app.register(editDebtor);
app.register(findAllDebtor);
// app.register(editServices);

app.register(createUser);

app.listen({ port: 3333 || process.env.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server running");
});
