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
exports.getReviews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.query.productId;
        if (!productId || isNaN(parseInt(productId.toString()))) {
            res.status(400).json({ message: "Product ID is required or invalid ID" });
            return;
        }
        const reviewMapData = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
        };
        const reviews = yield prisma.review.findMany({
            where: {
                productId: {
                    equals: parseInt(productId.toString()),
                },
            },
        });
        reviews.forEach((review) => {
            if (review.rating >= 1 && review.rating <= 5) {
                reviewMapData[review.rating.toString()] += 1;
            }
        });
        let totalRatingSum = 0;
        for (let i = 0; i < reviews.length; i++) {
            totalRatingSum += reviews[i].rating;
        }
        const averageRating = (totalRatingSum / reviews.length).toFixed(1);
        res.status(200).json({
            ratings: reviewMapData,
            averageRating: averageRating,
            reviews: reviews,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getReviews = getReviews;
