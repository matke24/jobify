import axios from "axios";
import { BASE_URL } from "../const";

export const customFetch = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};
