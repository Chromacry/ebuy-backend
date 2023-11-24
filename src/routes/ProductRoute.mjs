import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addProduct, getAllProducts } from "../controllers/ProductController.mjs";
const router = Router();

router.get("/get/all", getAllProducts);
router.post("/add", addProduct);

export default router;
