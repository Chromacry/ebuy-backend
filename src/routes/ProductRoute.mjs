import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/ProductController.mjs";
const router = Router();

router.get("/get/all", getAllProducts);
router.get("/get", getProduct);
router.post("/add", addProduct);
router.delete("/delete", deleteProduct);
router.post("/update", updateProduct);
export default router;
