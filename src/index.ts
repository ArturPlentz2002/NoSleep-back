import express from "express";
import { sendMessageHandler } from "./controller/SlackController";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send-message", sendMessageHandler);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
