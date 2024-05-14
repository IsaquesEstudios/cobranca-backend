import { AxiosError } from "axios";
import { sendBillingEmail } from "../functions/send-billing-email";
import { apiMercadoPago } from "../lib/mercado-pago-api";
import { prisma } from "../lib/prisma";

export async function createPaymentForService() {
  // const findPaymentForCurrentDate = await prisma.services.findMany({
  //   where: {
  //     pay_at: String(new Date().getDate()),
  //   },
  //   include: {
  //     debtor: {
  //       select: {
  //         email: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });
  // if (findPaymentForCurrentDate) {
  //   findPaymentForCurrentDate.map(async (item, _) => {
  //     try {
  //       const payment: any = await apiMercadoPago.post("/v1/payments", {
  //         description: item.description,
  //         payer: {
  //           email: "matteus.isaque29@gmail.com",
  //           first_name: "matteus",
  //         },
  //         external_reference: "matteus.isaque29@gmail.com",
  //         payment_method_id: "pix",
  //         transaction_amount: Number(item.value),
  //       });
  //       await sendBillingEmail({
  //         title: item.title,
  //         description: item.description,
  //         email: item.debtor.email,
  //         debtor: item.debtor.name,
  //         pay_at: item.pay_at,
  //         date_of_expiration: payment.date_of_expiration,
  //         link: payment.point_of_interaction.ticket_url,
  //         value: item.value,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   return "success";
  // }
}
