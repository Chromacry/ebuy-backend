import { Router } from "express";
import { addReview,updateReview,getProductReviews,deleteReview } from "../controllers/ReviewController.mjs";
const router = Router();

router.post("/add/review", addReview);
router.put("/update/review", updateReview);
router.get("/get", getProductReviews);
router.delete("/delete", deleteReview)

export default router;
