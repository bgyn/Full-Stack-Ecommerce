import { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../utils/jwt";
import { User } from "../../types/express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tokenCookie = req.cookies?.token;
  const tokenHeader = req.headers.authorization?.split(" ")[1];

  const token = tokenCookie || tokenHeader;

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyJWTToken(token) as User;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
  return next();
};

export const restrictTo = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      if (req.accepts("html")) {
        res.redirect("/auth/login");
        return;
      }
      res.status(401).json({ message: "Unauthorize" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      if (req.accepts("html")) {
        res.status(403).send("Your are not allowed to access this route.");
        return;
      } else {
        res
          .status(403)
          .json({ message: "Your are not allowed to access this route." });
        return;
      }
    }
    return next();
  };
};
