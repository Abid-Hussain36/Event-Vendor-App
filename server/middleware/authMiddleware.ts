import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../schemas/User";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET!);
      next();
    } else {
      res.status(400).json({ message: "No authorization header provided!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in authentication!" });
  }
};
