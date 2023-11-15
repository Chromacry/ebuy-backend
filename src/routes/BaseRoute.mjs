import { Router } from "express";
const router = Router();

import UserRoute from "./UserRoute.mjs";

router.use("/user", UserRoute);

export default router;
