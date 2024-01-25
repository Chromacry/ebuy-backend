import { Router } from "express";
import { deleteAccount, getUser, login, passwordReset, register, updateProfileImage, updateUserToSeller, updateUsername } from "../controllers/UserController.mjs";

const router = Router();

router.post("/add", register);
router.post("/login", login);
router.get("/getUser", getUser);
router.post("/passwordReset", passwordReset);
router.post("/updateUserToSeller", updateUserToSeller);
router.put("/updateUsername", updateUsername);
router.put("/updateProfileImage", updateProfileImage);
router.delete("/deleteAccount", deleteAccount);

export default router;
