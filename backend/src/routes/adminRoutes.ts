import express from "express";
import { restrictTo } from "../middelware/authMiddleware";

const router = express.Router();

router.get("/dashboard", restrictTo(["ADMIN"]), (req, res) => {
  return res.render("admin", {
    user: req.user,
  });
});

export default router;
