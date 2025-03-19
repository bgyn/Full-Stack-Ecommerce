import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const addProudct = async (req: Request, res: Response) => {
  try {
    const { name, description, categories, variants } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        categories: {
          create: categories,
        },
        ProductVariants: {
          create: variants,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
