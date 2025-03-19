import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadFile } from "../utils/r2Service";

const prisma = new PrismaClient();

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();

    res.status(200).json(categories);
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

    const url = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      "ecommerce",
      "category/images",
      req.file.mimetype
    );

    const category = await prisma.categories.create({
      data: {
        categoryName,
        categoryImage: url,
      },
    });

    res.redirect("/category");
  } catch (err) {
    console.error("Error adding category:", err);

    res.status(500).json({ message: "Internal Server Error" });
  }
};
