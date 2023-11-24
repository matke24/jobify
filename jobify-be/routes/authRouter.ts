import { Router } from "express";
const router = Router();

import { loginController, registerController } from "../controller/index.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/index.js";

router.post("/register", validateUserRegistration, registerController);
router.post("/login", validateUserLogin, loginController);

export default router;
