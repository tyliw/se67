// import { BookingCabinInterface } from "../../interface/Ibooking-cabin";
import axios from "axios";
import { BookingCabinInterface } from "../../interface/IBookingCabin";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function GetBookingCabin() {
  return await axios
    .get(`${apiUrl}/booking-cabins`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetBookingCabinById(id: number) {
  return await axios
    .get(`${apiUrl}/booking-cabin/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateBookingCabin(data: BookingCabinInterface) {
  return await axios
    .post(`${apiUrl}/booking-cabin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateBookingCabinById(id: number, data: BookingCabinInterface) {
  return await axios
    .put(`${apiUrl}/booking-cabin/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteBookingCabinById(id: number) {
  return await axios
    .delete(`${apiUrl}/booking-cabin/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetBookingCabin,
  GetBookingCabinById,
  UpdateBookingCabinById,
  DeleteBookingCabinById,
  CreateBookingCabin,
};
