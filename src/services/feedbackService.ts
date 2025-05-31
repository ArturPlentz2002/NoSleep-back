// src/services/feedbackService.ts
import { FeedbackModel } from "../models/feedbackModel";
import SlackService from "./SlackService";

const feedbackService = {
  async sendFeedback(senderId: string, text: string, tags: string[] = [], anonymous: boolean = false) {
    const feedback = new FeedbackModel({
      sender: senderId,
      content: text,
      tags,
      anon: anonymous,
    });

    const saved = await feedback.save();
    console.log("✅ Feedback salvo no Mongo:", saved);

    await SlackService.sendToChannel(text); // Envia ao Slack
    return saved;
  },

  async getReceivedFeedback(userId: string) {
    return await FeedbackModel.find({ receiverUser: userId });
  },

  async getSentFeedback(userId: string) {
    return await FeedbackModel.find({ sender: userId });
  },
};

export default feedbackService;
