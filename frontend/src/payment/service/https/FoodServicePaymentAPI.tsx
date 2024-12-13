
import { FoodServicePaymentInterface } from "../../interface/IFoodServicePayment";
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

async function GetFoodServicePayment() {
  return await axios
    .get(`${apiUrl}/foodservicepayments`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetFoodServicePaymentById(id: string) {
  return await axios
    .get(`${apiUrl}/foodservicepayment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateFoodServicePayment(data: FoodServicePaymentInterface) {
  return await axios
    .post(`${apiUrl}/foodservicepayment`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateFoodServicePaymentById(id: string, data: FoodServicePaymentInterface) {
  return await axios
    .put(`${apiUrl}/foodservicepayment/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteFoodServicePaymentById(id: string) {
  return await axios
    .delete(`${apiUrl}/foodservicepayment/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetFoodServicePayment,
  GetFoodServicePaymentById,
  UpdateFoodServicePaymentById,
  DeleteFoodServicePaymentById,
  CreateFoodServicePayment,
};
