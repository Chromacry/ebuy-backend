import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addOrder, getAllOrders, updateOrder } from "../controllers/OrderController.mjs";
const router = Router();


router.post("/add", addOrder);
router.get("/get/all", getAllOrders);
router.put("/update", updateOrder);



export default router;
