import { AxiosInstance } from "axios";
import {
  FormEntryData,
  JobData,
  JobRequestParams,
  JobStatistics,
  JobsWithPagination,
} from "../types";
import { createRestClient } from ".";

interface IJobService {
  getAllJobs: (req?: JobRequestParams) => Promise<JobsWithPagination>;
  getSingleJob: (id: string) => Promise<JobData>;
  createJob: (data: FormEntryData) => Promise<void>;
  editJob: (id: string, data: FormEntryData) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  getJobStats: () => Promise<JobStatistics>;
}

export const jobService = (): IJobService => {
  const client: AxiosInstance = createRestClient({ baseUrl: "/jobs" });

  return {
    async getAllJobs(req?: JobRequestParams) {
      if (req) {
        const { data } = await client.get<JobsWithPagination>("", {
          params: req,
        });
        return data;
      }
      const { data } = await client.get<JobsWithPagination>("");
      return data;
    },
    getSingleJob: async (id: string) => {
      const { data } = await client.get<JobData>(id);
      return data;
    },
    async createJob(data: FormEntryData) {
      await client.post("", data);
    },
    async editJob(id: string, data: FormEntryData) {
      await client.patch(id, data);
    },
    async deleteJob(id: string) {
      await client.delete(id);
    },
    async getJobStats() {
      const { data } = await client.get<JobStatistics>("/stats");
      return data;
    },
  };
};
