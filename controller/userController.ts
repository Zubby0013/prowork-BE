import {Request, Response} from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt  from "jsonwebtoken";
import { sendEmail, sendResetPasswordEmail } from "../utils/email";

export const registerUser = async(req:Request,res:Response)=>{
    try {
        const {email, password} = req.body;

        const token = crypto.randomBytes(3).toString('hex');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);

        const user = userModel.create({
            email,
            password:hash,
            token: token
        });
        sendEmail(user);
        
        return res.status(201).json({
            message: "user created successful",
            data: user
        })
    } catch (error:any) {
        return res.status(404).json({
            message: "error" ,
            data: error.message
        })
    }
};

export const signinUser = async(req:any,res:Response):Promise<Response>=>{
    try {
        const {email, password} = req.body;
 
        const user = await userModel.findOne({email});
        console.log(user)

           if (user) {
              const hash = await bcrypt.compare(password, user.password);
            if (hash) {
                if (user.token === "" && user.verify) {
                    const token = jwt.sign({id: user._id},"best", {expiresIn: "1d"}) ;

                    req.session.isAuth = true;
                    req.session.data = user._id;
                    // console.log(req)

                    return res.status(201).json({
                        message: "user signed successful",
                        data: token
                    })
                } else {
                    return res.status(404).json({
                        message: "your account hasn't be verified" 
                    });
                }
            } else {
                return res.status(404).json({
                    message: "password incorrect" 
                });
            }
           } else {
            return res.status(404).json({
                message: "user account not found" 
            });
           }        
        
    } catch (error:any) {
        console.log(error)
        return res.status(404).json({
            message: "error" ,
            data: error.message
        });
    }
};

export const readAllUser = async(req:Request,res:Response)=>{
    try {
        const user = await userModel.find();
        
        return res.status(200).json({
            message: "users all found",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "error reading all user" 
        })
    }
};

export const readUserCookies = async(req:any,res:Response)=>{
    try {
        const user = req.session;
        
        return res.status(200).json({
            message: "error reading cookies",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "error reading all user" 
        })
    }
};

export const readOneUser = async(req:Request,res:Response)=>{
    try {
        const {userID} = req.params
        const user = await userModel.findById(userID);
        
        return res.status(200).json({
            message: "users all found",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "error reading all user" 
        })
    }
};

export const logOutUser = async(req:any,res:Response)=>{
    try {
        const user = req.session.destroy();
        
        return res.status(200).json({
            message: "user has logged out",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "error logging out user" 
        })
    }
};

export const verifyUser = async(req:Request,res:Response)=>{
    
    try {
        const {userID} = req.params;
        const {token} = req.body;
        
        const user = await userModel.findById(userID);

        if (user?.token === token) {
            await userModel.findByIdAndUpdate(
                userID,
                {
                    token: "",
                    verify: true,
                },
                {new: true}
            );
            return res.status(200).json({
                message: "user account verified",
                data: user
            });
        } else {
            return res.status(404).json({
                message: "user not found",
                
            })
        }
        
    } catch (error:any) {
        return res.status(404).json({
            message: "error verifing" ,
            data: error.message
        })
    }
};

export const resetUserPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const getUser = await userModel.findOne({ email });
      if (getUser) {
        const token = crypto.randomBytes(16).toString("hex");
  
        const checkUser = await userModel.findByIdAndUpdate(
          getUser._id,
          {
            token,
          },
          { new: true }
        );
  
        sendResetPasswordEmail(checkUser);
  
        return res.status(200).json({
          message: "An email has been sent to confirm your request",
        });
      } else {
        return res.status(404).json({
          message: "No user found",
        });
      }
    } catch (error: any) {
      return res.status(404).json({
        message: "Error creating reseting password: ",
      });
    }
  };

  export const changeUserPassword = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { userID } = req.params;
  
      const getUser = await userModel.findById(userID);
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      if (getUser) {
        if (getUser.token !== "" && getUser.verify) {
          await userModel.findByIdAndUpdate(
            getUser._id,
            {
              password: hashedPassword,
              token: "",
            },
            { new: true }
          );
  
          return res.status(200).json({
            message: "You password has been changed",
          });
        } else {
          return res.status(404).json({
            message: "Please go and verify your account",
          });
        }
      } else {
        return res.status(404).json({
          message: "No user found",
        });
      }
    } catch (error: any) {
      return res.status(404).json({
        message: "Error changing user password: ",
      });
    }
  };