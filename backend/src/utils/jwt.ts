import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRECT_KEY = process.env.JWT_SECRET || "SECRECT_KEY";

export const generateToken = (payload: object, expiresIn: string = "7d") => {
  return jwt.sign(payload, SECRECT_KEY);
};

export const verifyJWTToken = (token: string) => {
  return jwt.verify(token, SECRECT_KEY);
};
