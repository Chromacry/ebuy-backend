import { Router } from "express";
import { addReview,updateReview,getProductReviews,deleteReview } from "../controllers/ReviewController.mjs";
const router = Router();

router.post("/add/review", addReview);
router.put("/update/review", updateReview);
router.get("/get/:id", getProductReviews);
router.delete("/delete/:id", deleteReview)

export default router;
