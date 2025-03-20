"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategories = exports.getCategories = void 0;
const client_1 = require("@prisma/client");
const r2Service_1 = require("../utils/r2Service");
const prisma = new client_1.PrismaClient();
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.categories.findMany();
        const bucket = "ecommerce";
        const categoriesWithSignedUrl = yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            {
                const signedUrl = yield (0, r2Service_1.getFileSignedUrl)(bucket, category.categoryImage);
                return Object.assign(Object.assign({}, category), { signedUrl });
            }
        })));
        res.status(200).json(categoriesWithSignedUrl);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getCategories = getCategories;
const addCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { categoryName } = req.body;
        if (!categoryName || !((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer)) {
            res.status(400).json({ message: "Category name and image are required" });
            return;
        }
        const bucket = "ecommerce";
        const path = "category/images";
        yield (0, r2Service_1.uploadFile)(req.file.buffer, req.file.originalname, bucket, path, req.file.mimetype);
        yield prisma.categories.create({
            data: {
                categoryName,
                categoryImage: `${path}/${req.file.originalname}`,
            },
        });
        res.redirect("/category");
    }
    catch (err) {
        console.error("Error adding category:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.addCategories = addCategories;
