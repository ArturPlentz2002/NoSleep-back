import { Request, Response } from "express";
import feedbackService from "../services/feedbackServices";
import SlackService from "../services/SlackService";

interface SendFeedbackRequestBody {
  text: string;
  tags?: string[];
  anon?: boolean;
}

export const feedbackController = {
  send: async (req: Request<{}, {}, SendFeedbackRequestBody>, res: Response): Promise<void> => {
    const userId = req.user!.id;
    const { text, tags, anon } = req.body;

    if (!text?.trim()) {
      res.status(400).json({ message: "Missing required field: text" });
      return;
    }

    try {
      const result = await feedbackService.sendFeedback(userId, text, tags, anon);

      // Envia para o Slack (canal fixo)
      await SlackService.sendToChannel(text);

      res.status(201).json(result);
    } catch (error: any) {
      console.error(`❌ Erro ao enviar feedback: ${error.message}`);
      res.status(500).json({ message: "Erro ao processar feedback" });
    }
  },

  getInbox: async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    try {
      const feedbacks = await feedbackService.getReceivedFeedback(userId);
      res.status(200).json(feedbacks);
    } catch (error: any) {
      console.error(`❌ Erro ao buscar inbox: ${error.message}`);
      res.status(500).json({ message: "Erro ao buscar feedbacks recebidos" });
    }
  },

  getSent: async (req: Request, res: Response): Promise<void> => {
    const userId = req.user!.id;
    try {
      const feedbacks = await feedbackService.getSentFeedback(userId);
      res.status(200).json(feedbacks);
    } catch (error: any) {
      console.error(`❌ Erro ao buscar enviados: ${error.message}`);
      res.status(500).json({ message: "Erro ao buscar feedbacks enviados" });
    }
  }
};
