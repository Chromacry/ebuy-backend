import { Router } from "express";
import { register } from "../controllers/UserController.mjs";
import { getAllProducts } from "../controllers/ProductController.mjs";
const router = Router();

router.get("/get/all", getAllProducts);

export default router;
