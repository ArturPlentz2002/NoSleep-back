import express from "express";
import feedbackRoutes from "./routes/feedbackRoutes";
import { sendMessageHandler } from "./controllers/SlackController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota de teste
app.get("/", (_req, res) => {
  res.send("Servidor está rodando!");
});

// Rota do Slack
app.post("/send-message", sendMessageHandler);

// ✅ Rota de feedbacks
app.use("/feedback", feedbackRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
