import express from "express";

type User = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
