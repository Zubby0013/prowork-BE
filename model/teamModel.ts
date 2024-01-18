import { Document, Schema, model } from "mongoose";

interface iteam {
  teamName: string;
  avatar: string;
  email: string;
}

interface iteamData extends iteam, Document {}

const teamModel = new Schema<iteamData>(
  {
    teamName: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true }
);

export default model<iteamData>("teams", teamModel);