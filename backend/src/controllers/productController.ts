import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { deleteFile, getFileSignedUrl, uploadFile } from "../utils/r2Service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

type Product = {
  name: string;
  description: string;
  sizes: string;
  stock: string;
  price: string;
  category: string;
  subcategory: string;
};

const productSelect = {
  id: true,
  name: true,
  description: true,
  sizes: true,
  stock: true,
  images: {
    select: {
      url: true,
      productID: true,
    },
  },
  subCategoryId: true,
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      select: productSelect,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limit);

    await Promise.all(
      products.map(async (product) => {
        await Promise.all(
          product.images.map(async (image) => {
            image.url = await getFileSignedUrl("ecommerce", image.url);
          })
        );
      })
    );

    res.status(200).json({
      products,
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
    const product = req.body as Product;
    const files = req.files as Express.Multer.File[];

    const bucket = "ecommerce";
    const path = "products/images";

    const sizes = product.sizes
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size !== "");

    await Promise.all(
      files.map(async (file) => {
        await uploadFile(
          file.buffer,
          file.originalname,
          bucket,
          path,
          file.mimetype
        );
      })
    );

    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        sizes: sizes,
        stock: parseInt(product.stock, 10),
        price: parseFloat(product.price),
        subCategory: {
          connect: {
            id: parseInt(product.subcategory, 10),
          },
        },
        images: {
          create: files.map((file) => {
            return {
              url: `${path}/${file.originalname}`,
            };
          }),
        },
      },
      include: {
        images: true,
      },
    });

    res.status(201).json({ message: "Product created", newProduct });
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
      product.images.map(async (image) => {
        image.url = await getFileSignedUrl("ecommerce", image.url);
      })
    );
    res.status(200).json({ product });
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
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
      select: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    await Promise.all(
      product.images.map(async (image) => {
        await deleteFile("ecommerce", image.url);
      })
    );

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
