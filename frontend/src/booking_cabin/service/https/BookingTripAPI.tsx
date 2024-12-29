// import { BookingTripInterface } from "../../interface/Ibooking-trips";
import axios from "axios";
import { BookingTripInterface } from "../../interface/IBookingTrip";

const apiUrl = "http://localhost:8000";

const Authorization = localStorage.getItem("token");

const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

async function GetBookingTrip() {
  return await axios
    .get(`${apiUrl}/booking-trips`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetBookingTripById(id: number) {
  return await axios
    .get(`${apiUrl}/booking-trip/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateBookingTrip(data: BookingTripInterface) {
  return await axios
    .post(`${apiUrl}/booking-trip`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateBookingTripById(id: number, data: BookingTripInterface) {
  return await axios
    .put(`${apiUrl}/booking-trip/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteBookingTripById(id: number) {
  return await axios
    .delete(`${apiUrl}/booking-trip/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  GetBookingTrip,
  GetBookingTripById,
  UpdateBookingTripById,
  DeleteBookingTripById,
  CreateBookingTrip,
};
