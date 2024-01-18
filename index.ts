import express,{Application, NextFunction,Request,Response} from "express";
import cor from 'cors';
import { mainApp } from "./mainApp";
import dbConfig from "./config/dbConfig";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongo from "connect-mongodb-session";

const port = 3444;
const app:Application = express();
const mongoSession = mongo(session);

app.use(cor());
app.use(express.json());
app.use(cookieParser())
mainApp(app);

app.use((req:Request,res: Response, next: NextFunction)=>{
    res.header("Access-Control-Allow-Origin","http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

var store = new mongoSession({
    uri: "mongodb://localhost:27017/proDB",
    collection: "session",
  });

  app.use(
    session({
      secret: "just-work",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 48,
        secure: false,
        
      },
      store: store,
    })
  );

const server = app.listen(port,()=>{
    dbConfig()
});

process.on("uncaughtException", (err:Error)=>{
    console.log("uncaughtException",err)
});

process.on("unhandledRejection",(reason:any)=>{
    console.log("unhandledRejection",reason)
   server.close(()=>{
    process.exit(1)
   })
})