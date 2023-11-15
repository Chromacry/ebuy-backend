import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
const router = Router();

router.post("/add", register);

export default router;
