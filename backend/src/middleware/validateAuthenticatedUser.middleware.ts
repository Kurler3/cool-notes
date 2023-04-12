import { NextFunction, Request, Response } from "express";
import { ISession } from "../types/sessions.types";
import createHttpError from "http-errors";

// VALIDATE AUTHENTICATED USER MIDDLEWARE
export const validateAuthenticatedUserMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
  
      const authenticatedUserId = (req.session as ISession).userId;

      if(authenticatedUserId) {

        res.locals = {
          userId: authenticatedUserId,
        }

        next()
      } else {
        next(createHttpError(401, "User not authenticated"))
      }
  };