import { Router } from "express";
import { addReview } from "../controllers/ReviewController.mjs";
const router = Router();

router.post("/add/review", addReview);

export default router;
