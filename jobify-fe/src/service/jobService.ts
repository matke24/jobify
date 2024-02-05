import { AxiosInstance } from "axios";
import { FormEntryData } from "../types";
import { createRestClient } from ".";

interface IJobService {
  createJob: (data: FormEntryData) => Promise<void>;
  editJob: (id: string, data: FormEntryData) => Promise<void>;
}

export const jobService = (): IJobService => {
  const client: AxiosInstance = createRestClient({ baseUrl: "/jobs" });

  return {
    async createJob(data: FormEntryData) {
      await client.post("", data);
    },
    async editJob(id: string, data: FormEntryData) {
      await client.patch(id, data);
    },
  };
};
