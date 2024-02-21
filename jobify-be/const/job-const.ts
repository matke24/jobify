import { JobSort } from "../enum/index.js";

export const CANNOT_CREATE_JOB = "Cannot create job. Please try again";
export const SUCCESSFULLY_UPDATED = "Successfully updated";
export const EMPTY_NAME_ERROR_MESSAGE =
  "Name cannot be empty. Please provide name.";
export const NAME_LENGTH_ERROR_MESSAGE =
  "Name should be between 3 and 50 characters long.";

export const sortOptions = new Map<JobSort, string>([
  [JobSort.NEWEST_FIRST, "-createdAt"],
  [JobSort.OLDEST_FIRST, "createdAt"],
  [JobSort.ASCENDING, "position"],
  [JobSort.DESCENDING, "-position"],
]);
