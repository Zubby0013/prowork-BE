import nodemailer from "nodemailer";
import ejs from "ejs";
import jwt from "jsonwebtoken";
import path from "path";
import { google } from "googleapis";

const GOOGLE_ID =
  "848542784186-9os7noa7qvcg3nckfu38s3bhob8u6oga.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
const GOOGLE_REFRESH =
  "1//04GgN8ydoI_ZdCgYIARAAGAQSNwF-L9IrKCOkFE95PncupZNTb3WCiygNcFb1vp20oW-1SMJTKzSWxnWw2B6nf4S85GXSTpgR44M";

  const oAuth = new google.auth.OAuth2(GOOGLE_ID,GOOGLE_SECRET,GOOGLE_URL);
  oAuth.setCredentials({refresh_token: GOOGLE_REFRESH});

  // const URL: string = `http://localhost:5173`;
const URL: string = `http://localhost:5174`;

  export const sendEmail = async (user: any) => {
    try {
      const accessToken: any = (await oAuth.getAccessToken()).token;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "codelabbest@gmail.com",
          clientSecret: GOOGLE_SECRET,
          clientId: GOOGLE_ID,
          refreshToken: GOOGLE_REFRESH,
          accessToken,
        },
      });
      const getFile = path.join(__dirname, "../views/index.ejs");
  
      const data = {
        token: user.token,
        email: user.email,
        // http://localhost:5174/account/verify
        // url: `${URL}/user-verify/${user._id}`,
        url: `${URL}/account/verify`,
      };
  
      const html = await ejs.renderFile(getFile, { data });
  
      const mailer = {
        from: "CodeLab🔥🔥 <codelabbest@gmail.com>",
        to: user.email,
        subject: "Account Opening",
        html,
      };
  
      await transporter.sendMail(mailer).then(() => {
        console.log("send");
      });
    } catch (error) {
      return error;
    }
  };
  

  // export const sendEmail = async(user:any)=>{
  //   const token:any = (await oAuth.getAccessToken()).token;

  //   const transport = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //           type: "OAuth2",
  //           user: "codelabbest@gmail.com",
  //           clientId: GOOGLE_ID,
  //           clientSecret: GOOGLE_SECRET,
  //           refreshToken: GOOGLE_REFRESH,
  //           accessToken: token 
  //       }
  //   });

  //   const tokenID = jwt.sign({id: user._id},"simple");
  //   const readData = path.join(__dirname, "../views/index.ejs");

  //   const data = await ejs.renderFile(readData, {
  //       userName: user.email.split("@")[0],
  //       link: `http://localhost:5173/${tokenID}`,
  //       url: `http://localhost:5173/${tokenID}`,
  //       token: user.verifiedToken,
  //     });

  //     const mailer = {
  //       from: "proWork💕👍 <codelabbest@gmail.com>",
  //       to: user.email,
  //       subject: "Account Registration",
  //       html: data,
  //     };

  //     transport.sendMail(mailer).then(() => {
  //       console.log("sent");
  //     });

  //     try {
  //   } catch (error) {
  //     return error;
  //   };
  // };

  export const sendResetPasswordEmail = async (user: any) => {
    try {
      const accessToken: any = (await oAuth.getAccessToken()).token;
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "codelabbest@gmail.com",
          clientSecret: GOOGLE_SECRET,
          clientId: GOOGLE_ID,
          refreshToken: GOOGLE_REFRESH,
          accessToken,
        },
      });
  
      const getFile = path.join(__dirname, "../views/reset.ejs");
  
      const data = {
        token: user.token,
        email: user.email,
        url: `${URL}/user-verify/${user._id}`,
      };
  
      const html = await ejs.renderFile(getFile, { data });
  
      const mailer = {
        from: "proWork🔥🔥 <codelabbest@gmail.com>",
        to: user.email,
        subject: "Account Opening",
        html,
      };
  
      await transporter.sendMail(mailer).then(() => {
        console.log("send");
      });
    } catch (error) {
      return error;
    }
  };