import express from "express";
import { restrictTo } from "../middelware/authMiddleware";

const router = express.Router();

router.get("/dashboard", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("dashboard", {
    user: req.user,
  });
});

router.get("/products", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("addProducts");
});

export default router;
