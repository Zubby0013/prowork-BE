import { Types } from "mongoose";
import userModel from "../model/userModel";
import { Request, Response } from "express";
import projectModel from "../model/projectModel";


export const createProject = async (req: Request, res: Response) => {
    try {
      const { projectName, comment } = req.body;
      console.log(projectName);
  
      const { userID } = req.params;
  
      const project = await projectModel.create({
        projectName,
        comment,
        myTask: {
          todo: {
            id: "todo",
            data: [],
          },
          progress: {
            id: "progress",
            data: [],
          },
          done: {
            id: "done",
            data: [],
          },
        },
      });
  
      const user = await userModel.findById(userID);
  
      user?.project.push(new Types.ObjectId(project._id));
      user?.save();
  
      return res.status(201).json({
        message: "project created",
        data: project,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error creating project ",
      });
    }
  };

export const getAllProjects = async (req: Request, res: Response) => {
    try {
      const {userID} = req.params;

      const user = await projectModel.findById(userID).populate({
        path: "projects"
      });
  
      return res.status(200).json({
        message: "getting all projects ",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error getting projects ",
      });
    }
  };

export const getOneProject = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;
  
      const user = await projectModel.findById(userID);
  
      return res.status(200).json({
        message: "getting one project ",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error getting project ",
      });
    }
  };

export const deleteOneProject = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;
  
      const user = await projectModel.findByIdAndDelete(userID);
  
      return res.status(200).json({
        message: "deleting one project ",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error deleting project ",
      });
    }
  };