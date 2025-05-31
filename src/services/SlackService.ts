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
    } catch (error) {
      console.error("Erro SlackService sendMessage:", error);
      throw error;
    }
  }

  // Aqui podem entrar outros métodos relacionados ao Slack
}

export default new SlackService();
