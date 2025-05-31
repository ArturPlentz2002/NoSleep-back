import { Request, Response } from "express";
import feedbackService from "../services/feedbackServices";

// Define o formato esperado no body do envio de feedback
interface SendFeedbackRequestBody {
  text: string;
  tags?: string[];
  anon?: boolean;
  receiverUser?: string; // opcional: se quiser enviar feedback para alguém específico
}

export const feedbackController = {
  /**
   * Envia um novo feedback
   */
  send: async (req: Request<{}, {}, SendFeedbackRequestBody>, res: Response): Promise<void> => {
    const userId = req.user!.id; // preenchido pelo authMiddleware
    const { text, tags, anon } = req.body;

    if (!text?.trim()) {
      res.status(400).json({ message: "Missing required field: text" });
      return;
    }

    try {
      const result = await feedbackService.sendFeedback(userId, text, tags, anon);
      res.status(201).json(result);
    } catch (error: any) {
      console.error(`❌ Erro ao enviar feedback: ${error.message}`);
      res.status(500).json({ message: "Erro ao processar feedback" });
    }
  },

  /**
   * Busca os feedbacks recebidos pelo usuário logado
   */
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

  /**
   * Busca os feedbacks enviados pelo usuário logado
   */
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
