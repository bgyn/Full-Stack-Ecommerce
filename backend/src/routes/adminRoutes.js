"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middelware/authMiddleware");
const router = express_1.default.Router();
router.get("/dashboard", authMiddleware_1.verifyToken, (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    return res.render("dashboard", {
        user: req.user,
    });
});
router.get("/login", (req, res) => {
    return res.render("login");
});
router.get("/products/add", authMiddleware_1.verifyToken, (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    return res.render("addProducts");
});
router.get("/category", authMiddleware_1.verifyToken, (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    return res.render("category");
});
router.get("/category/add", authMiddleware_1.verifyToken, (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    return res.render("addCategories");
});
router.get("/users", authMiddleware_1.verifyToken, (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    return res.render("users");
});
router.post("/logout", (0, authMiddleware_1.restrictTo)(["ADMIN"]), (req, res) => {
    res.clearCookie("token");
    res.redirect("login");
});
exports.default = router;
