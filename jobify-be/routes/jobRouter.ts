import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  editJob,
  deleteJob,
  createJob,
} from "../controller/index.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/jobHandlerMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateIdParam, validateJobInput, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
