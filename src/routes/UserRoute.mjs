import { Router } from "express";
import { login, register } from "../controllers/UserController.mjs";
const router = Router();

router.post("/add", register);
router.post("/login", login)

export default router;
