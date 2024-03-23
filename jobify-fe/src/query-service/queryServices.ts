import { jobService as JobService } from "../service";

const jobService = JobService();

export const statsQuery = {
  queryKey: ["stats"],
  queryFn: () => jobService.getJobStats(),
};
