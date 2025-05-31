// src/services/SlackService.ts
import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";

dotenv.config();

class SlackService {
  private client: WebClient;

  constructor() {
    this.client = new WebClient(process.env.SLACK_BOT_TOKEN);
  }

  async sendMessage(channel: string, text: string) {
    try {
      const result = await this.client.chat.postMessage({ channel, text });
      return result;
    } catch (error: any) {
      console.error("Erro SlackService sendMessage:", error.data?.error || error.message);
      throw new Error(error.data?.error || "Erro ao enviar mensagem");
    }
  }

  async sendToChannel(text: string) {
    const channelId = "C08UVK9E4DS"; // substitua se necessário

    try {
      const result = await this.client.chat.postMessage({
        channel: channelId,
        text,
      });
      console.log("✅ Mensagem enviada para o canal:", result.ts);
      return result;
    } catch (error: any) {
      console.error("❌ Erro ao enviar para canal:", error.data?.error || error.message);
      throw new Error(error.data?.error || "Erro ao enviar para canal Slack");
    }
  }
}

export default new SlackService();