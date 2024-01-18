import { Document, Schema, Types, model } from "mongoose";

interface iUser{
    email: string
    password: string
    token: string
    verify: boolean
    avatar: string
    task: Array<{}>
    project: Array<{}>
    team: Array<{}>
};

interface iUserData extends iUser, Document{};

const userModel = new Schema<iUserData>(
    {
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String
        },
        token:{
            type: String
        },
        avatar:{
            type: String
        },
        verify:{
            type: Boolean,
            default: false
        },
        project: [
            {
                type: Types.ObjectId,
                ref: "projects"
            }
        ],
        task: [
            {
                type: Types.ObjectId,
                ref: "projects"
            }
        ],
        team: [
            {
                type: Types.ObjectId,
                ref: "projects"
            }
        ],
    },
    {timestamps: true}
);

export default model<iUserData>("onlineFlows",userModel);