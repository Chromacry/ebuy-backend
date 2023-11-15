import { Router } from "express";
import { getUser, login, register } from "../controllers/UserController.mjs";
const router = Router();

router.post("/add", register);
router.post("/login", login);
router.get("/getUser", getUser);

export default router;
