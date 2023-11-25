import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addOrder, getAllOrders, updateOrder, deleteOrder } from "../controllers/OrderController.mjs";
const router = Router();


router.post("/add", addOrder);



export default router;
