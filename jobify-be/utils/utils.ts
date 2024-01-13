import { JobBackendModel, UserBackendModel } from "../types/index.js";

export const setAuthorNames = (
  jobs: JobBackendModel[],
  users: UserBackendModel[]
): JobBackendModel[] => {
  return jobs.map((job) => {
    const {
      _id,
      company,
      position,
      jobStatus,
      jobType,
      jobLocation,
      createdAt,
      updatedAt,
      author,
      _v,
    } = job;
    const auth = users.find(
      (user) => user._id.toString() === job.author.toString()
    );
    return {
      _id,
      company,
      position,
      jobStatus,
      jobType,
      jobLocation,
      createdAt,
      updatedAt,
      author,
      authorName: auth && `${auth.fname} ${auth.lname}`,
      _v,
    };
  });
};
