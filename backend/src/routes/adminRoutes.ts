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

router.get("/category", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("category");
});

router.get("/category/add", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("addCategories");
});

router.get(
  "/subCategory/add",
  verifyToken,
  restrictTo(["ADMIN"]),
  (req, res) => {
    return res.render("addSubCategories");
  }
);

router.get("/users", verifyToken, restrictTo(["ADMIN"]), (req, res) => {
  return res.render("users");
});

router.post("/logout", restrictTo(["ADMIN"]), (req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

export default router;
