import { Request, Response } from "express";
import SlackService from "../services/SlackService";

export async function sendMessageHandler(req: Request, res: Response) {
  const { channel, text } = req.body;

  try {
    const result = await SlackService.sendMessage(channel, text);
    res.json({ ok: true, ts: result.ts });
  } catch (error) {
    res.status(500).json({ ok: false });
  }
}
