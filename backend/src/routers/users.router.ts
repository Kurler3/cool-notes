import express from "express";
import validate from "../middleware/validateResource.middleware";
import signUpSchema from "../schemas/users/signUp.schema";
import * as userController from "../controllers/users.controller";
import loginSchema from "../schemas/users/login.schema";
import { validateAuthenticatedUserMiddleware } from "../middleware/validateAuthenticatedUser.middleware";

////////////////////////////////////
// INIT USERS ROUTER ///////////////
////////////////////////////////////

const usersRouter = express.Router();


// SIGN UP ROUTE
usersRouter.post("/sign-up", validate(signUpSchema), userController.signUpController);

// LOGIN ROUTE
usersRouter.post('/login', validate(loginSchema), userController.loginController);

// GET AUTHENTICATED USER
usersRouter.get('/getAuthenticatedUser', validateAuthenticatedUserMiddleware, userController.getAuthenticatedUserController);

usersRouter.post('/logout', validateAuthenticatedUserMiddleware,  userController.logoutController);

////////////////////////////////////
// EXPORT ROUTER  //////////////////
////////////////////////////////////

export default usersRouter;