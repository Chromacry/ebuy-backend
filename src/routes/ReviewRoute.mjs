import { Router } from "express";
import { addReview, getProductReviews } from "../controllers/ReviewController.mjs";

const router = Router();

router.post("/add/review", addReview);
router.get("/get/:id", getProductReviews);
export default router;
