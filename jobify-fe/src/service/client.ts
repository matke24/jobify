import axios from "axios";
import { BASE_URL } from "../const";

export const createRestClient = (config?: { baseUrl: string }) => {
  if (config === undefined || config.baseUrl === null) {
    return axios.create({
      baseURL: BASE_URL,
    });
  }
  return axios.create({
    baseURL: `${BASE_URL}${config.baseUrl}`,
  });
};
