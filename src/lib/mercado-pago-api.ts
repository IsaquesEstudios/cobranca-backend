import axios from "axios";

type apiMercadoPagoTypes = {
  url: string;
  typeRequest: string;
  body?: any;
};

const apiMercadoPago = axios.create({
  baseURL: "https://api.mercadopago.com",
  headers: {
    Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
  },
});

export { apiMercadoPago };
