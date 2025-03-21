import express from "express";
import { restrictTo } from "../middelware/authMiddleware";
import {
  addProduct,
  getProductById,
  getProducts,
  removeProduct,
} from "../controllers/productController";
import upload from "../utils/multer";

const router = express.Router();

router.get("/", restrictTo(["ADMIN", "USER"]), getProducts);

router.get("/:id", restrictTo(["ADMIN", "USER"]), getProductById);

router.delete("/", restrictTo(["ADMIN"]), removeProduct);

router.post("/add", restrictTo(["ADMIN"]), upload.any(), addProduct);

export default router;
