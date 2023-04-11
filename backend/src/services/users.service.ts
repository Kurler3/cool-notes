import { FilterQuery } from "mongoose";
import UserModel, { IUser } from "../models/user.model";
import { ICreateUserInput } from "../types/users.types";


export const findUser = async (
    query: FilterQuery<IUser>
) => {
    return await UserModel.findOne(query).exec();
}

export const createUser = async (
    newUser: ICreateUserInput,
) => {
    return await UserModel.create(newUser);
}