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


async function GetMenuDetailById(id: string) {
  return await axios

    .get(`${apiUrl}/menudetail/${id}`, requestOptions)

    .then((res) => res)

    .catch((e) => e.response);
}

export {
  GetMenuDetailById,
};