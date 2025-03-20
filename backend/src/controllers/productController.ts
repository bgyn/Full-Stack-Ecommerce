import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { buffer } from "stream/consumers";
import upload from "../utils/multer";
import { uploadFile } from "../utils/r2Service";

const prisma = new PrismaClient();

type Product = {
  name: string;
  description: string;
  variants: Variants[];
  category: string[];
};

type Variants = {
  name: string;
  description: string;
  price: number;
  size: string;
  stock: number;
  color: string;
  sku: string;
};

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
    const variantImagesMap: Record<string, any> = {};
    const product = req.body as Product;
    const files = req.files as Express.Multer.File[];

    const bucket = "ecommerce";
    const path = "products/images";

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

    const productVariantsData = await Promise.all(
      product.variants.map(async (variant: Variants, index: number) => {
        const uploadedImages = await Promise.all(
          (variantImagesMap[index] || []).map(async (image: any) => {
            await uploadFile(
              image.buffer,
              image.fileName,
              bucket,
              path,
              image.mimetype
            );
            return {
              image: `${path}/${image.fileName}`,
            };
          })
        );

        return {
          price: variant.price,
          color: variant.color,
          size: variant.size.toString(),
          stock: variant.stock,
          sku: variant.sku,
          images: { create: uploadedImages },
        };
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        productVariants: { create: productVariantsData },
        categories: {
          connect: product.category.map((category) => ({
            id: parseInt(category, 10),
          })),
        },
      },
    });

    res.status(201).json({ newProduct });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
