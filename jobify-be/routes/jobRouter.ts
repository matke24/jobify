import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  editJob,
  deleteJob,
  createJob,
} from "../controller/jobController.js";
import {
  validateJobInput,
  validateJobId,
} from "../middleware/validationHandlerMiddleware.js";

const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateJobId, getSingleJob)
  .patch(validateJobId, validateJobInput, editJob)
  .delete(validateJobId, deleteJob);

export default router;
