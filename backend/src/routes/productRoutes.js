"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middelware/authMiddleware");
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("../utils/multer"));
const router = express_1.default.Router();
router.get("/", (0, authMiddleware_1.restrictTo)(["ADMIN", "USER"]), productController_1.getProducts);
router.post("/add", (0, authMiddleware_1.restrictTo)(["ADMIN"]), multer_1.default.any(), productController_1.addProduct);
exports.default = router;
