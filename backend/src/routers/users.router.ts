import express from "express";
import validate from "../middleware/validateResource.middleware";
import signUpSchema from "../schemas/users/signUp.schema";
import * as userController from "../controllers/users.controller";

////////////////////////////////////
// INIT USERS ROUTER ///////////////
////////////////////////////////////

const usersRouter = express.Router();


// SIGN UP ROUTE
usersRouter.post("/sign-up", validate(signUpSchema), userController.signUpController);


////////////////////////////////////
// EXPORT ROUTER  //////////////////
////////////////////////////////////

export default usersRouter;