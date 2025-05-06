import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/Images", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
