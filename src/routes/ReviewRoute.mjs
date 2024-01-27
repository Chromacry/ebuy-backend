import { Router } from "express";
import { addReview,updateReview,getProductReviews,deleteReview, getReviewByReviewId } from "../controllers/ReviewController.mjs";
const router = Router();

router.post("/add/review", addReview);
router.put("/update/review", updateReview);
router.get("/get", getProductReviews);
router.delete("/delete", deleteReview)
router.get("/get-review", getReviewByReviewId);

export default router;
