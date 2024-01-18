import {Application,Request,Response} from "express";
import auth from "./router/userRouter";
import project from "./router/projectRouter";
import task from "./router/taskRouter";
import team from "./router/teamRouter";

export const mainApp = ((app:Application)=>{
   try {
      app.use('/api/v1',auth);
      app.use('/api/v1',project);
      app.use('/api/v1',task);
      app.use('/api/v1',team);
      
      app.get("/",(req:Request,res:Response)=>{
         try {
            return res.status(200).json({
                message: "welcome to my auth flow"
            });
         } catch (error) {
            return res.status(404).json({
               message: "default error"
            })
         };
       });
   } catch (error) {
     return error 
   }
});