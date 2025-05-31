import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./db";
import statsRoutes from "./routes/statsRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";

connectDB();
config();


const app = express();
app.use(cors());
app.use(express.json());

app.use("/feedback", feedbackRoutes);
app.use("/api/user", statsRoutes); 

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("✅ Conectado ao MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  });
