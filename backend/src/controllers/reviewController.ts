import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviews = async (req: Request, res: Response) => {
  try {
    const productId = req.query.productId;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    if (!productId || isNaN(parseInt(productId.toString()))) {
      res.status(400).json({ message: "Invalid product Id" });
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
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalReview = await prisma.review.count();
    const totalPages = Math.ceil(totalReview / limit);

    let totalRatingSum = 0;

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        reviewMapData[review.rating.toString()] += 1;
      }
      totalRatingSum += review.rating;
    });

    const averageRating = (totalRatingSum / reviews.length).toFixed(1);

    res.status(200).json({
      ratings: reviewMapData,
      averageRating: averageRating,
      reviews: reviews,
      pageSize: limit,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
