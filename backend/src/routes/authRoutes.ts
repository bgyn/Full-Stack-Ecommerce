import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("login");
});

export default router;
