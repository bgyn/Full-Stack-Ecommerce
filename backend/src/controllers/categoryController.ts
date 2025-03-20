import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFileSignedUrl, uploadFile } from "../utils/r2Service";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();

    const bucket = "ecommerce";

    const categoriesWithSignedUrl = await Promise.all(
      categories.map(async (category) => {
        {
          const signedUrl = await getFileSignedUrl(
            bucket,
            category.categoryImage
          );

          return { ...category, signedUrl };
        }
      })
    );

    res.status(200).json(categoriesWithSignedUrl);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addCategories = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || !req.file?.buffer) {
      res.status(400).json({ message: "Category name and image are required" });
      return;
    }

    const bucket = "ecommerce";
    const path = "category/images";

    await uploadFile(
      req.file.buffer,
      req.file.originalname,
      bucket,
      path,
      req.file.mimetype
    );

    await prisma.categories.create({
      data: {
        categoryName,
        categoryImage: `${path}/${req.file.originalname}`,
      },
    });

    res.redirect("/category");
  } catch (err) {
    console.error("Error adding category:", err);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
