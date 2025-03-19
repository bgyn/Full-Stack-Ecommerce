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

  // If no token is provided, don't proceed to the next middleware
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = verifyJWTToken(token) as User;
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const restrictTo = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // If the user is not authenticated, deny access
    if (!req.user) {
      if (req.accepts("html")) {
        res.redirect("/login");
        return;
      }
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // If the user's role is not allowed, deny access
    if (!roles.includes(req.user.role)) {
      if (req.accepts("html")) {
        res.status(403).send("You are not allowed to access this route.");
        return;
      }
      res
        .status(403)
        .json({ message: "You are not allowed to access this route." });
      return;
    }

    // If everything is good, proceed to the next middleware or route handler
    return next();
  };
};
