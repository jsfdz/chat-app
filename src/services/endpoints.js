import axios from "axios";

const BASE = "https://academlo-chat.herokuapp.com/api";

export const signup = async (username, email, password) =>
  await axios
    .post(`${BASE}/users/signup`, { username, email, password })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response;
    });

export const signin = async (email, password) =>
  await axios
    .post(`${BASE}/users/login`, { email, password })
    .then((response) => {
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response;
    });

export const disconnect = () => {
  localStorage.removeItem("user");
};
