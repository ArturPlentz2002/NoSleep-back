import { FeedbackModel } from "../models/feedbackModel";
import SlackService from "./SlackService"; // importe o serviço Slack

const feedbackService = {
  /**
   * Cria e armazena um novo feedback no MongoDB
   * e envia via DM no Slack
   */
  async sendFeedback(
    senderId: string,
    text: string,
    tags: string[] = [],
    anonymous: boolean = false,
    receiverSlackId?: string // <- novo parâmetro opcional
  ) {
    const feedback = new FeedbackModel({
      sender: senderId,
      content: text,
      tags,
      anon: anonymous,
      // receiverUser: "...", // adicione quando necessário
    });

    const saved = await feedback.save();
    console.log("✅ Feedback salvo no Mongo:", saved);

    // Envia mensagem no Slack via DM, se tiver destinatário definido
    if (receiverSlackId) {
      try {
        await SlackService.sendDirectMessage(receiverSlackId, text);
      } catch (err) {
        console.error("❌ Erro ao enviar feedback no Slack:", err);
      }
    }

    return saved;
  },

  async getReceivedFeedback(userId: string) {
    const received = await FeedbackModel.find({ receiverUser: userId }).populate("sender");
    console.log(`📥 Feedbacks recebidos por ${userId}:`, received);
    return received;
  },

  async getSentFeedback(userId: string) {
    const sent = await FeedbackModel.find({ sender: userId }).populate("receiverUser");
    console.log(`📤 Feedbacks enviados por ${userId}:`, sent);
    return sent;
  }
};

export default feedbackService;
