import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    await prisma.profile.create({
      data: {
        userId: user.id,
        name,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    const token = generateToken({ ...userWithoutPassword });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = generateToken({ ...userWithoutPassword });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
