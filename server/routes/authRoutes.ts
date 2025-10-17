import express from "express";
import { registerUser, login } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", login);

export default authRoutes;
