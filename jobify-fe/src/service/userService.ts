import { AxiosInstance } from "axios";
import { createRestClient } from ".";
import { UserData } from "../types";

interface IUserService {
  getCurrentUser: () => Promise<UserData>;
  updateUser: (data: FormData) => Promise<void>;
}

export const userService = (): IUserService => {
  const client: AxiosInstance = createRestClient({ baseUrl: "/users" });
  return {
    async getCurrentUser() {
      const { data } = await client.get<UserData>("/current-user");
      return data;
    },
    async updateUser(data: FormData) {
      await client.patch("/update-user", data);
    },
  };
};
