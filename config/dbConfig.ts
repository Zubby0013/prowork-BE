import { connect } from "mongoose";

const URL:string = 'mongodb://127.0.0.1:27017/proDB';

const dbConfig = async()=>{
    try {
       await connect(URL).then(()=>{
            console.log("let's go flying 🚀🚀🚀🚀")
            console.log("DB Connected...")
       }).catch(()=> console.error())
    } catch (error:any) {
        return error.data
    }
};

export default dbConfig;