import { Router } from "express";
import {
  getAllJobs,
  getSingleJob,
  editJob,
  deleteJob,
  createJob,
} from "../controller/jobController.js";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(editJob).delete(deleteJob);

export default router;
