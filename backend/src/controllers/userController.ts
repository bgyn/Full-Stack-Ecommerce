import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        profile: true,
        isActive: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
