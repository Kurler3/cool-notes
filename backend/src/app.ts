import "dotenv/config";
import express, {
    NextFunction,
    Request,
    Response,
} from "express";
import notesRouter from "./routers/notes.router";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import usersRouter from "./routers/users.router";

////////////////////////////////
// INIT APP ////////////////////
////////////////////////////////

const app = express();

////////////////////////////////
// APP MIDDLEWARE //////////////
////////////////////////////////

// ACCEPT JSON DATA IN BODY
app.use(express.json());

app.use(morgan("dev"));

app.use(cors())

////////////////////////////////
// SETTING ROUTERS /////////////
////////////////////////////////

// USERS ROUTER
app.use("/api/users", usersRouter);

// NOTES ROUTER
app.use("/api/notes", notesRouter);

////////////////////////////////
// NOT FOUND ERROR HANDLING ////
////////////////////////////////

app.use((req, res, next) => {
    next(createHttpError(404, `Not Found - ${req.originalUrl}`));
});

////////////////////////////////
// ERROR HANDLING //////////////
////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Error: ", error);

    let errorMessage = "An unknown error ocurred!";
    let statusCode = 500;

    if(isHttpError(error)) {

        errorMessage = error.message;
        statusCode = error.statusCode;

    }

    return res.status(statusCode).json({error: errorMessage})
})

///////////////////////////////
// EXPORT APP /////////////////
///////////////////////////////

export default app;