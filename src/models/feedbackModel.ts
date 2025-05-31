import { Schema, model } from "mongoose";

const FeedbackSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverUser: { type: Schema.Types.ObjectId, ref: "User" },
    receiverTeam: { type: Schema.Types.ObjectId, ref: "Team" },
    content: { type: String, required: true },
    messageTs: { type: String },
    sourceChannel: { type: String },
  },
  { timestamps: true }
);

export const FeedbackModel = model("Feedback", FeedbackSchema);
