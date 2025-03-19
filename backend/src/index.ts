import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { json } from "body-parser";

import { verifyToken } from "./middelware/authMiddleware";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use("/auth", authRoutes);
app.use("/category", verifyToken, categoryRoutes);
app.use("/admin", verifyToken, adminRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
