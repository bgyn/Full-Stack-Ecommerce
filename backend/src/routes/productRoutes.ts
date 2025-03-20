import express from "express";
import { restrictTo } from "../middelware/authMiddleware";
import { addProduct, getProducts } from "../controllers/productController";
import upload from "../utils/multer";

const router = express.Router();

router.get("/", restrictTo(["ADMIN", "USER"]), getProducts);

router.post("/add", restrictTo(["ADMIN"]), upload.any(), addProduct);

export default router;
