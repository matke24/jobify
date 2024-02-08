import { AxiosInstance } from "axios";
import { FormEntryData, JobStatistics } from "../types";
import { createRestClient } from ".";

interface IJobService {
  createJob: (data: FormEntryData) => Promise<void>;
  editJob: (id: string, data: FormEntryData) => Promise<void>;
  getJobStats: () => Promise<JobStatistics>;
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
    async getJobStats() {
      const { data } = await client.get<JobStatistics>("/stats");
      return data;
    },
  };
};
