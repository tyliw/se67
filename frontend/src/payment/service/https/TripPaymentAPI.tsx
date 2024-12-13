import { TripPaymentInterface } from "../../interface/ITripPayment";
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

async function GetTripPayment() {
  return await axios
    .get(`${apiUrl}/trippayments`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTripPaymentById(id: string) {
  return await axios
    .get(`${apiUrl}/trippayment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateTripPayment(data: TripPaymentInterface) {
  return await axios
    .post(`${apiUrl}/trippayment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateTripPaymentById(id: string, data: TripPaymentInterface) {
  return await axios
    .put(`${apiUrl}/trippayment/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTripPaymentById(id: string) {
  return await axios
    .delete(`${apiUrl}/trippayment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetTripPayment,
  GetTripPaymentById,
  UpdateTripPaymentById,
  DeleteTripPaymentById,
  CreateTripPayment,
};
