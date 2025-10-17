import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db_connection";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("App listening at PORT: ", PORT));
