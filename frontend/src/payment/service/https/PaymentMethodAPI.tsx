import { PaymentMethodInterface } from "../../interface/IPaymentMethod";
import axios from "axios";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function GetPaymentMethod() {
  return await axios
    .get(`${apiUrl}/paymentmethods`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetPaymentMethodById(id: string) {
  return await axios
    .get(`${apiUrl}/paymentmethod/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreatePaymentMeThod(data: PaymentMethodInterface) {
  return await axios
    .post(`${apiUrl}/paymentmethod`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdatePaymentMeThodById(id: string, data: PaymentMethodInterface) {
  return await axios
    .put(`${apiUrl}/paymentmethod/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeletePaymentMeThodById(id: string) {
  return await axios
    .delete(`${apiUrl}/paymentmethod/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetPaymentMethod,
  GetPaymentMethodById,
  UpdatePaymentMeThodById,
  DeletePaymentMeThodById,
  CreatePaymentMeThod,
};
