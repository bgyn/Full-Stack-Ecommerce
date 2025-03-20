"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middelware/authMiddleware");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
router.get("/", (0, authMiddleware_1.restrictTo)(["ADMIN", "USER"]), reviewController_1.getReviews);
exports.default = router;
