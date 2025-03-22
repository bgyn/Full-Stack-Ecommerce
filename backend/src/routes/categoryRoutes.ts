import { Router } from "express";
import {
  addCategories,
  addSubCategories,
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

router.post("/subCategory/add", restrictTo(["ADMIN"]), addSubCategories);

export default router;
