import { Document, Schema, Types, model } from "mongoose";

interface iProject {
  projectName: string;
  comment: string;
  budget: number;
  budgetLeft: number;
  budgetGivenOut: number;
  staff: Array<{}>;
  task: Array<{}>;
  myTask: {};
}

interface iProjectData extends iProject, Document {}

const projectModel = new Schema<iProjectData>(
  {
    projectName: {
      type: String,
    },

    comment: {
      type: String,
    },

    myTask: {
      type: {},
    },

    staff: [
      {
        type: Types.ObjectId,
        ref: "staffs",
      },
    ],

    task: [
      {
        type: Types.ObjectId,
        ref: "tasks",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<iProjectData>("projects", projectModel);