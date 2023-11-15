import { Router } from "express";
import { getUser, login, passwordReset, register, updateUsername } from "../controllers/UserController.mjs";
const router = Router();

router.post("/add", register);
router.post("/login", login);
router.get("/getUser", getUser);
router.post("/passwordReset", passwordReset);
router.post("/updateUsername", updateUsername)

export default router;
