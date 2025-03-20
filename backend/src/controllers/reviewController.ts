import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviews = async (req: Request, res: Response) => {
  try {
    const productId = req.query.productId;

    if (!productId || isNaN(parseInt(productId.toString()))) {
      res.status(400).json({ message: "Product ID is required or invalid ID" });
      return;
    }

    const reviewMapData: Record<string, number> = {
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    };

    const reviews = await prisma.review.findMany({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
