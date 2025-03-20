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
exports.addProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const r2Service_1 = require("../utils/r2Service");
const prisma = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sizes = [];
        const colors = [];
        const rating = 0;
        const products = yield prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                productVariants: {
                    select: {
                        id: true,
                        price: true,
                        sku: true,
                        color: true,
                        size: true,
                        stock: true,
                        images: {
                            select: {
                                productVariantId: true,
                                image: true,
                            },
                        },
                    },
                },
                categories: {
                    select: {
                        id: true,
                        categoryName: true,
                    },
                },
            },
        });
        for (const product of products) {
            for (const variant of product.productVariants) {
                for (const image of variant.images) {
                    image.image = yield (0, r2Service_1.getFileSignedUrl)("ecommerce", image.image);
                }
            }
        }
        products.forEach((product) => {
            product.productVariants.forEach((variant) => {
                if (!sizes.includes(variant.size)) {
                    sizes.push(variant.size);
                }
                if (!colors.includes(variant.color)) {
                    colors.push(variant.color);
                }
            });
        });
        res.status(200).json(Object.assign(Object.assign({}, products), { sizes, colors }));
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
exports.getProducts = getProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variantImagesMap = {};
        const product = req.body;
        const files = req.files;
        const bucket = "ecommerce";
        const path = "products/images";
        const categories = Array.isArray(product.category)
            ? product.category
            : [product.category];
        files.forEach((file) => {
            const fieldMatch = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
            if (fieldMatch) {
                const variantIndex = parseInt(fieldMatch[1], 10);
                if (!variantImagesMap[variantIndex]) {
                    variantImagesMap[variantIndex] = [];
                }
                variantImagesMap[variantIndex].push({
                    fileName: file.originalname,
                    buffer: file.buffer,
                    mimetype: file.mimetype,
                });
            }
        });
        const productVariantsData = yield Promise.all(product.variants.map((variant, index) => __awaiter(void 0, void 0, void 0, function* () {
            yield Promise.all((variantImagesMap[index] || []).map((image) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, r2Service_1.uploadFile)(image.buffer, image.fileName, bucket, path, image.mimetype);
                return { image: `${path}/${image.originalname}` };
            })));
            return {
                price: parseFloat(variant.price),
                sku: variant.sku,
                stock: parseInt(variant.stock, 10),
                size: variant.size,
                color: variant.color,
                images: {
                    create: (variantImagesMap[index] || []).map((image) => ({
                        image: `${path}/${image.fileName}`,
                    })),
                },
            };
        })));
        const newProduct = yield prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                productVariants: {
                    create: productVariantsData,
                },
                categories: {
                    connect: categories.map((category) => ({
                        id: parseInt(category, 10),
                    })),
                },
            },
        });
        res.status(201).json({ newProduct });
    }
    catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: err || "Internal Server Error" });
    }
});
exports.addProduct = addProduct;
