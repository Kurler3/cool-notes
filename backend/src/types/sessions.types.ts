import { Session } from "express-session";
import mongoose from "mongoose";

export interface ISession extends Session {
    userId: mongoose.Types.ObjectId;
}