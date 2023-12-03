import {
  validateUpdateUserInput,
  authorizePermission,
} from "../middleware/index.js";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controller/userController.js";
import { Router } from "express";
import { UserRole } from "../enum/user.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermission(UserRole.ADMIN),
  getAppStats
);
router.patch("/update-user", validateUpdateUserInput, updateUser);

export default router;
