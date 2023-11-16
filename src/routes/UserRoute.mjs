import { Router } from "express";
import { getUser, login, passwordReset, register } from "../controllers/UserController.mjs";
const router = Router();

router.post("/add", register);
router.post("/login", login);
router.get("/getUser", getUser);
router.post("/passwordReset", passwordReset);

export default router;
