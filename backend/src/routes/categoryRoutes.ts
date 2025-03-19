import { Router } from "express";
import { addCategories } from "../controllers/categoryController";
import { restrictTo } from "../middelware/authMiddleware";
import upload from "../utils/multer";

const router = Router();

router.post(
  "/add",
  restrictTo(["ADMIN"]),
  upload.single("categoryImage"),
  addCategories
);

export default router;
