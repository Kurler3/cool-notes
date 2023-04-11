import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";
import { createUser, findUser, findUserById } from "../services/users.service";
import { omit } from "lodash";
import { ISession } from "../types/sessions.types";
import UserModel from "../models/user.model";

// SIGN UP USER (CREATE)
export const signUpController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    // CHECK IF ALREADY EXISTS USER WITH THAT USERNAME
    const existingUsername = await findUser({
      username,
    });

    // IF EXISTS => ERROR
    if (existingUsername) {
      throw createHttpError(
        400,
        `User with username '${username}' already exists!`
      );
    }

    // CHECK IF ALREADY EXISTS USER WITH THAT EMAIL
    const existingEmail = await findUser({
      email,
    });

    // IF EXISTS => ERROR
    if (existingEmail) {
      throw createHttpError(400, `User with email '${email}' already exists!`);
    }

    // CREATE NEW USER
    const newUser = await createUser({
      username,
      email,
      password,
    });

    (req.session as ISession).userId = newUser._id;

    // RETURN USER TO CLIENT
    return res.status(201).json(omit(newUser.toJSON(), ["password"]));
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
export const loginController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    // GET USER BY USERNAME AND SELECT THE EMAIL AS WELL
    const user = await UserModel.findOne({ username })
      .select("+email +password")
      .exec();

    // IF USER DOESN'T EXIST => THROW ERROR
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    console.log("User:", user);

    // COMPARE PASSWORDS!
    const isPasswordCorrect = await user.comparePassword(password);

    // IF DON'T MATCH => ERROR
    if (!isPasswordCorrect) {
      throw createHttpError(401, "Invalid credentials");
    }

    // SET REQ.SESSION.userId = USER ID
    (req.session as ISession).userId = user._id;

    res.status(200).json(omit(user.toJSON(), ["password"]));
  } catch (error) {
    next(error);
  }
};

// GET AUTHENTICATED USER CONTROLLER
export const getAuthenticatedUserController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const authenticatedUserId = (req.session as ISession).userId;

    try {

        if(!authenticatedUserId) {
            throw createHttpError(401, "User not authenticated!");
        }

        // SELECT THE EMAIL
        const user = await UserModel.findById(authenticatedUserId).select("+email").exec();

        return res.status(200).json(user);

    } catch (error) {
        next(error);
    }
};

// LOGOUT CONTROLLER
export const logoutController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.session.destroy((error: any) => {
      if(error) {
        return next(error);
      } else {
        return res.sendStatus(200);        
      }
    });
}