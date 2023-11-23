import { Router } from "express";
const router = Router();

import { loginController, registerController } from "../controller/index.js";

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
