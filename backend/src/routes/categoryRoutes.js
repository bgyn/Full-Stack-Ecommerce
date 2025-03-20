"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authMiddleware_1 = require("../middelware/authMiddleware");
const multer_1 = __importDefault(require("../utils/multer"));
const router = (0, express_1.Router)();
router.get("/", categoryController_1.getCategories);
router.post("/add", (0, authMiddleware_1.restrictTo)(["ADMIN"]), multer_1.default.single("categoryImage"), categoryController_1.addCategories);
exports.default = router;
