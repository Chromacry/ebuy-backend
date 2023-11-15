import { Router } from "express";
const router = Router();

import UserRoute from "./UserRoute.mjs";
import ProductRoute from "./ProductRoute.mjs";

router.use("/user", UserRoute);
router.use("/product", ProductRoute);
export default router;
