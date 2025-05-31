import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    slackId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
