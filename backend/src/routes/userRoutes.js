"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middelware/authMiddleware");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.get("/", (0, authMiddleware_1.restrictTo)(["ADMIN"]), userController_1.getUsers);
exports.default = router;
