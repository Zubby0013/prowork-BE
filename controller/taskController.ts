import { Request, Response } from "express";
import userModel from "../model/userModel";
import projectModel from "../model/projectModel";
import taskModel from "../model/taskModel";

export const createTaskNew = async (req: Request, res: Response) => {
    try {
        const { taskTitle, email, task } = req.body;

        const user = await userModel.findOne({ email });

        const { projectID, userID } = req.params;

        const productUser = await userModel.findById(userID);

        const project:any = await projectModel.findById(projectID);

        if (user) {
            project?.staff.push(user);
        }

        if (!project) {
            return res.status(404).json({
                message: "Failed to find project",
            });
        }

        const tasks = await taskModel.create({
            taskTitle,
            task,
            projectName: project.projectName,
        });

        productUser?.task.push(tasks);
        productUser?.save();

        project?.task.push(tasks);
        project?.myTask?.todo?.data.push(task);
        project?.save();

        const updatedProject = await projectModel.findByIdAndUpdate(
            projectID,
            project,
            { new: true }
        );

        return res.status(201).json({
            message: "Task created successfully",
            data: updatedProject,
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error creating task:",
        });
    }
};


// export const createTask = async (req: Request, res: Response) => {
//     try {
//       const { taskTitle, email, task } = req.body;
  
//       const user = await userModel.findOne({ email });
//       const { projectID, userID } = req.params;
//       const productUser = await userModel.findById(userID);
  
//       const project: any = await projectModel.findById(projectID);
//       if (user) {
//         project?.staff.push(user);
//       }
  
//       if (project) {
//         const tasks = await taskModel.create({
//           taskTitle,
//           task,
//           projectName: project.projectName,
//         });
  
//         mainUser?.task.push(tasks);
//         mainUser?.save();
  
//         project?.task.push(tasks);
//         project?.myTask?.todo?.data.push(task);
//         project?.save();
  
//         const projectTask = await projectModel.findByIdAndUpdate(
//           projectID,
//           project,
//           { new: true }
//         );
  
//         return res.status(201).json({
//           message: "task created",
//           data: projectTask,
//         });
//       } else {
//         return res.status(404).json({
//           message: "Failed to find project",
//         });
//       }
//     } catch (error) {
//         return res.status(404).json({
//             message: "Error creating task",
//           });
//     }
//   };
  
  export const getAllTasks = async (req: Request, res: Response) => {
    try {
      const {userID} = req.params;

      const user = await projectModel.findById(userID).populate({
        path: "tasks"
      });
  
      return res.status(200).json({
        message: "getting all tasks ",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error getting tasks ",
      });
    }
  };

  export const getOneTask = async (req: Request, res: Response) => {
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

export const deleteOneTask = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;
  
      const user = await taskModel.findByIdAndDelete(userID);
  
      return res.status(200).json({
        message: "deleting one task ",
        data: user,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Error deleting task ",
      });
    }
  };