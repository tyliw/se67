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
    .get(`${apiUrl}/trip-payments`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTripPaymentById(id: number) {
  return await axios
    .get(`${apiUrl}/trip-payment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateTripPayment(data: TripPaymentInterface) {
  return await axios
    .post(`${apiUrl}/trip-payment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateTripPaymentById(id: number, data: TripPaymentInterface) {
  return await axios
    .put(`${apiUrl}/trip-payment/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteTripPaymentById(id: number) {
  return await axios
    .delete(`${apiUrl}/trip-payment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetTripPaymentIDForFoodPayment(userID: number) {
  return await axios
    .get(`${apiUrl}/trip-paymentID-for-food-payment/${userID}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetTripPayment,
  GetTripPaymentById,
  UpdateTripPaymentById,
  DeleteTripPaymentById,
  CreateTripPayment,
  GetTripPaymentIDForFoodPayment,
};
