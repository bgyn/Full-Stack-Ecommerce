import { Router } from "express";
import { restrictTo } from "../middelware/authMiddleware";
import { getReviews } from "../controllers/reviewController";

const router = Router();

router.get("/", restrictTo(["ADMIN", "USER"]), getReviews);

export default router;
