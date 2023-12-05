import axios from "axios";
import { BASE_URL } from "../const";

export const serviceFactory = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};
