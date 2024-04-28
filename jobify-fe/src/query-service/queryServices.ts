import { jobService as JobService } from "../service";
import { userService as UserService } from "../service";

const jobService = JobService();
const userService = UserService();

export const statsQuery = {
  queryKey: ["stats"],
  queryFn: () => jobService.getJobStats(),
};

export const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const user = userService.getCurrentUser();
    return user;
  },
};
