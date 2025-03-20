import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { json } from "body-parser";

import { verifyToken } from "./middelware/authMiddleware";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", verifyToken, categoryRoutes);
app.use("/api/v1/product", verifyToken, productRoutes);
app.use("/api/v1/review", verifyToken, reviewRoutes);
app.use("/api/v1/user", verifyToken, userRoutes);

app.use("/", adminRoutes);

app.listen(3000, process.env.HOST!, () => {
  console.log("Server is running on port 3000");
});
