import { Schema, model } from "mongoose";

// Definição do schema do feedback
const FeedbackSchema = new Schema(
  {
    sender: { type: String, required: true }, // <-- ALTERAÇÃO FEITA AQUI
    receiverUser: { type: Schema.Types.ObjectId, ref: "User" },
    receiverTeam: { type: Schema.Types.ObjectId, ref: "Team" },
    content: { type: String, required: true },
    messageTs: { type: String },
    sourceChannel: { type: String },
  },
  { timestamps: true }
);

// Criação do modelo Mongoose
export const FeedbackModel = model("Feedback", FeedbackSchema);
