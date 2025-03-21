import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getFileSignedUrl, uploadFile } from "../utils/r2Service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type Product = {
  name: string;
  description: string;
  variants: Variants[];
  category: string[];
};

type Variants = {
  description: string;
  price: string;
  size: string;
  stock: string;
  color: string;
  sku: string;
};

const productSelect = {
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
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const sizes = new Set<string>();
    const colors = new Set<string>();

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      skip,
      take: limit,
      select: productSelect,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    await Promise.all(
      products.map(async (product) => {
        await Promise.all(
          product.productVariants.map(async (variant) => {
            await Promise.all(
              variant.images.map(async (image) => {
                image.image = await getFileSignedUrl("ecommerce", image.image);
              })
            );

            sizes.add(variant.size);
            colors.add(variant.color);
          })
        );
      })
    );

    res.status(200).json({
      products,
      sizes: Array.from(sizes),
      colors: Array.from(colors),
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    console.error("Error getting products:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const variantImagesMap: Record<string, any> = {};
    const product = req.body as Product;
    const files = req.files as Express.Multer.File[];

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

    const productVariantsData = await Promise.all(
      product.variants.map(async (variant: Variants, index: number) => {
        await Promise.all(
          (variantImagesMap[index] || []).map(async (image: any) => {
            await uploadFile(
              image.buffer,
              image.fileName,
              bucket,
              path,
              image.mimetype
            );
            return { image: `${path}/${image.originalname}` };
          })
        );

        return {
          price: parseFloat(variant.price),
          sku: variant.sku,
          stock: parseInt(variant.stock, 10),
          size: variant.size,
          color: variant.color,
          images: {
            create: (variantImagesMap[index] || []).map((image: any) => ({
              image: `${path}/${image.fileName}`,
            })),
          },
        };
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        productVariants: {
          create: productVariantsData,
        },
        categories: {
          connect: categories.map((category: string) => ({
            id: parseInt(category, 10),
          })),
        },
      },
    });

    res.status(201).json({ newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id as string, 10);
  if (isNaN(productId)) {
    res.status(400).json({ message: "Invalid product Id" });
    return;
  }
  try {
    const sizes = new Set<string>();
    const colors = new Set<string>();
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: productSelect,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    await Promise.all(
      product.productVariants.map(async (variant) => {
        await Promise.all(
          variant.images.map(async (image) => {
            image.image = await getFileSignedUrl("ecommerce", image.image);
          })
        );

        sizes.add(variant.size);
        colors.add(variant.color);
      })
    );

    res
      .status(200)
      .json({ product, sizes: Array.from(sizes), colors: Array.from(colors) });
  } catch (err) {
    console.error("Error removing product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.query.productId as string, 10);
  if (isNaN(productId)) {
    res.status(400).json({ message: "Invalid product Id" });
    return;
  }
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(200).json({ message: "Product removed" });
  } catch (err) {
    console.error("Error removing product:", err);
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};
