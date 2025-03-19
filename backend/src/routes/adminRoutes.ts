import express from "express";
import { restrictTo, verifyToken } from "../middelware/authMiddleware";

const router = express.Router();

router.get("/dashboard", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard", {
    user: req.user,
  });
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/products/add", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("addProducts");
});

router.get("/categories", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("categories");
});

router.get("/category/add", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("addCategories");
});

router.post("/logout", restrictTo(["ADMIN"]), (req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

export default router;
