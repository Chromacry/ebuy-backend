import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/ProductController.mjs";
const router = Router();

router.get("/get/all", getAllProducts);
router.post("/add", addProduct);
router.delete("/delete", deleteProduct);
router.post("/update", updateProduct);

export default router;
