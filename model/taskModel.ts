import { Document, Schema, Types, model } from "mongoose";

interface iTask {
  projectName: string
  task: string
  taskTitle: string
}

interface iTaskData extends iTask, Document {}

const taskModel = new Schema<iTaskData>(
  {
    taskTitle: { type: String },
    projectName: { type: String },
    task: { type: String },
  },
  { timestamps: true }
);

export default model<iTaskData>("tasks", taskModel);