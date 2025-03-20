import { Router } from "express";
import { restrictTo } from "../middelware/authMiddleware";
import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", restrictTo(["ADMIN"]), getUsers);

export default router;
