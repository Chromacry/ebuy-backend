import { Router } from "express";
import { addReview,updateReview } from "../controllers/ReviewController.mjs";
const router = Router();

router.post("/add/review", addReview);
router.put("/update/review", updateReview);
router.get("/get/:id", getProductReviews);

export default router;
