import nodemailer from "nodemailer";
import ejs from "ejs";

const node: any = nodemailer;

type sendBillingEmailProps = {
  email: string;
  title: string;
  debtor: string;
  value: string;
  pay_at: string;
  date_of_expiration: string;
  description: string;
  link: string;
};

export async function sendBillingEmail({
  email,
  title,
  debtor,
  value,
  pay_at,
  date_of_expiration,
  description,
  link,
}: sendBillingEmailProps) {
  const transporter = node.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    ssl: true,
    tls: true,
    auth: {
      user: process.env.EMAIL_BILLING,
      pass: process.env.PASSWORD_BILLING,
    },
  });
  const mailOptions = {
    from: "cobranca@isaquesestudios.com",
    to: email,
    subject: title,

    html: await ejs.renderFile(`${__dirname}/../templates/billing-email.ejs`, {
      name: debtor,
      payment_day: pay_at,
      payment_value: value,
      payment_expiration: new Date(date_of_expiration).toLocaleDateString(
        "pt-BR"
      ),
      description: description,
      link: link,
    }),
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
