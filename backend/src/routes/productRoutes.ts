import express from "express";
import { restrictTo } from "../middelware/authMiddleware";
import { addProudct } from "../controllers/productController";
import upload from "../utils/multer";

const router = express.Router();

router.post(
  "/add",
  restrictTo(["ADMIN"]),
  upload.any(),
  addProudct
);

export default router;
