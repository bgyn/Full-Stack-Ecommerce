import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFileSignedUrl, uploadFile } from "../utils/r2Service";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        SubCategory: {
          select: {
            subCategoryName: true,
            categoryId: true,
          },
        },
      },
    });

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

export const addSubCategories = async (req: Request, res: Response) => {
  try {
    console.log("addSubCategories");
    const {
      name,
      categoryId,
    }: {
      name: string;
      categoryId: string;
    } = req.body;

    if (!name || !categoryId) {
      res
        .status(400)
        .json({ message: "Sub Category name and Category Id are required" });
      return;
    }

    await prisma.subCategory.create({
      data: {
        subCategoryName: name,
        categoryId: parseInt(categoryId, 10),
      },
    });

    res.status(201).json({ message: "Sub Category added successfully" });
  } catch (err) {
    console.error("Error adding sub category:", err);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
