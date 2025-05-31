import { FeedbackModel} from "../models/feedbackModel";

const feedbackService = {
  /**
   * Cria e armazena um novo feedback no MongoDB
   */
  async sendFeedback(senderId: string, text: string, tags: string[] = [], anonymous: boolean = false) {
    const feedback = new FeedbackModel({
      sender: senderId,
      content: text,
      // Adicione aqui receiverUser ou receiverTeam se for usar depois
      // receiverUser: "...",
      // receiverTeam: "...",
    });

    const saved = await feedback.save();
    console.log("✅ Feedback salvo no Mongo:", saved);
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
