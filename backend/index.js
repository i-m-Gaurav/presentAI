import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRutes.js";
import presentationsRoutes from "./routes/presentations.js";

import connectDB from "./db/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/user", userRoutes);
app.use("/presentations", presentationsRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
