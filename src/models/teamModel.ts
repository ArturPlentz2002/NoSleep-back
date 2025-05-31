import { Schema, model } from "mongoose";

const TeamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slackTag: { type: String, required: true }, // ex: "@<time> ou @<usuario>"
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const TeamModel = model("Team", TeamSchema);
