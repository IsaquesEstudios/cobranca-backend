// import { FastifyInstance } from "fastify";
// import { ZodTypeProvider } from "fastify-type-provider-zod";
// import z from "zod";
// import { prisma } from "../../lib/prisma";

// export async function editServices(app: FastifyInstance) {
//   app.withTypeProvider<ZodTypeProvider>().put(
//     "/services/:id",
//     {
//       schema: {
//         params: z.object({
//           id: z.string(),
//         }),
//         body: z.object({
//           value: z.string().optional(),
//           service: z.string().optional(),
//           pay_at: z.string().optional(),
//         }),
//       },
//     },
//     async (request, reply) => {
//       try {
//         const { id } = request.params;
//         const { service, value, pay_at } = request.body;



//         const date = new Date();

//         const editServices = await prisma.services.update({
//           where: {
//             id: id,
//           },
//           data: {

//             value,
//             pay_at: date.toISOString(),
//             updated_at: date.toISOString(),
//           },
//         });

//         reply.send(205).send({ message: editServices });
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   );
// }
