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
import upload from "../middleware/multerMiddleware.js";
import { MULTER_FORM } from "../const/user-const.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermission(UserRole.ADMIN),
  getAppStats
);
router.patch(
  "/update-user",
  upload.single(MULTER_FORM),
  validateUpdateUserInput,
  updateUser
);

export default router;
