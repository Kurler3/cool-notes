import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import createHttpError from "http-errors";
import { createUser, findUser } from "../services/users.service";
import {
    omit
} from "lodash";


// SIGN UP USER (CREATE)
export const signUpController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    const {
        username,
        email,
        password,
    } = req.body;


    try {

        // CHECK IF ALREADY EXISTS USER WITH THAT USERNAME
        const existingUsername = await findUser({
            username,
        });

        // IF EXISTS => ERROR
        if(existingUsername) {
            throw createHttpError(400, `User with username '${username}' already exists!`);
        }

        // CHECK IF ALREADY EXISTS USER WITH THAT EMAIL
        const existingEmail = await findUser({
            email,
        });

        // IF EXISTS => ERROR
        if(existingEmail) {
            throw createHttpError(400, `User with email '${email}' already exists!`);
        }

        // CREATE NEW USER
        const newUser = await createUser({
            username,
            email,
            password
        });

        req.session.userId = newUser._id;

        // RETURN USER TO CLIENT
        return res.status(201).json(
            omit(newUser, ["password"])
        )

    } catch (error) {
        next(error);
    }
}