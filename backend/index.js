// package
import path from "path";
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// utils
import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRoute from "./routes/productRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRoute);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
console.log(__dirname)
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
