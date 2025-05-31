import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes";
import { sendMessageHandler } from "./controllers/SlackController";
import cors from "cors";

const app = express();            
app.use(cors());                  
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.send("Servidor está rodando!");
});

app.post("/send-message", sendMessageHandler);
app.use("/feedback", feedbackRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
