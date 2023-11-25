import { Router } from "express";
const router = Router();

import UserRoute from "./UserRoute.mjs";
import ProductRoute from "./ProductRoute.mjs";
import ReviewRoute from "./ReviewRoute.mjs";
import OrderRoute from "./OrderRoute.mjs";

router.use("/user", UserRoute);
router.use("/product", ProductRoute);
router.use("/review", ReviewRoute);
router.use("/order", OrderRoute);

export default router;
