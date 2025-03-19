import { Router } from "express";
import {
  addCategories,
  getCategories,
} from "../controllers/categoryController";
import { restrictTo } from "../middelware/authMiddleware";
import upload from "../utils/multer";

const router = Router();

router.get("/", getCategories);

router.post(
  "/add",
  restrictTo(["ADMIN"]),
  upload.single("categoryImage"),
  addCategories
);

export default router;
