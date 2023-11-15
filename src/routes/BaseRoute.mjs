import { Router } from "express";
const router = Router();

import UserRoute from "./UserRoute.mjs";
import ProductRoute from "./ProductRoute.mjs";
import ReviewRoute from "./ReviewRoute.mjs";

router.use("/user", UserRoute);
router.use("/product", ProductRoute);
router.use("/review", ReviewRoute);

export default router;
