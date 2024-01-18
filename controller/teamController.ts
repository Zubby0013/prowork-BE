import { Request, Response } from "express";
import teamModel from "../model/teamModel";
import userModel from "../model/userModel";
import { Types } from "mongoose";


export const createStaff = async (req: Request, res: Response) => {
    try {
      const { teamName, avatar } = req.body;
  
      const { userID } = req.params;
  
      const team = await teamModel.create({
        teamName,
        avatar,
      });
  
      const user = await userModel.findById(userID);
  
      user?.team.push(new Types.ObjectId(team._id));
      user?.save();
  
      return res.status(201).json({
        msg: "team created",
        data: team,
      });
    } catch (error) {
        return res.status(404).json({
            message: "error creating staff",
          });
    }
  };