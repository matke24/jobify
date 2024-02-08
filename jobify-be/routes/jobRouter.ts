import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  editJob,
  deleteJob,
  createJob,
  jobStats,
} from "../controller/index.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/jobHandlerMiddleware.js";
import { checkIsTestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllJobs)
  .post(checkIsTestUser, validateJobInput, createJob);
router.route("/stats").get(jobStats);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkIsTestUser, validateIdParam, validateJobInput, editJob)
  .delete(checkIsTestUser, validateIdParam, deleteJob);

export default router;
