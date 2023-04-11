import express from "express";
import validate from "../middleware/validateResource.middleware";
import signUpSchema from "../schemas/users/signUp.schema";
import * as userController from "../controllers/users.controller";
import loginSchema from "../schemas/users/login.schema";

////////////////////////////////////
// INIT USERS ROUTER ///////////////
////////////////////////////////////

const usersRouter = express.Router();


// SIGN UP ROUTE
usersRouter.post("/sign-up", validate(signUpSchema), userController.signUpController);

// LOGIN ROUTE
usersRouter.post('/login', validate(loginSchema), userController.loginController);

// GET AUTHENTICATED USER
usersRouter.get('/getAuthenticatedUser', userController.getAuthenticatedUserController);

usersRouter.post('/logout', userController.logoutController);

////////////////////////////////////
// EXPORT ROUTER  //////////////////
////////////////////////////////////

export default usersRouter;