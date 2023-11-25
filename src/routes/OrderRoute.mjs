import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addOrder, getAllOrders } from "../controllers/OrderController.mjs";
const router = Router();


router.post("/add", addOrder);
router.get("/get/all", getAllOrders);



export default router;
