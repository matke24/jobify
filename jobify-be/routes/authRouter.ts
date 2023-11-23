import { Router } from "express";
const router = Router();

import { loginController, registerController } from "../controller/index.js";
import { validateUserRegistration } from "../middleware/index.js";

router.post("/register", validateUserRegistration, registerController);
router.post("/login", loginController);

export default router;
