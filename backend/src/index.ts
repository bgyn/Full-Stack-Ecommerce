import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { json } from "body-parser";

import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import { verifyToken } from "./middelware/authMiddleware";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(json());

app.use("/auth", authRoutes);
app.use("/admin", verifyToken, adminRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
