import { validateUpdateUserInput } from "../middleware/index.js";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { Router } from "express";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getAppStats);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
