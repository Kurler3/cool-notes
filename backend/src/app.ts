import "dotenv/config";
import express, {
    NextFunction,
    Request,
    Response,
} from "express";
import notesRouter from "./routers/notes.router";
import CustomError from "./utils/classes/CustomError";

////////////////////////////////
// INIT APP ////////////////////
////////////////////////////////

const app = express();

////////////////////////////////
// APP MIDDLEWARE //////////////
////////////////////////////////

// ACCEPT JSON DATA IN BODY
app.use(express.json());

////////////////////////////////
// SETTING ROUTERS /////////////
////////////////////////////////

app.use("/api/notes", notesRouter);

////////////////////////////////
// NOT FOUND ERROR HANDLING ////
////////////////////////////////

app.use((req, res, next) => {

    const error = new CustomError(`not found - ${req.originalUrl}`, 404);

    next(error);
});

////////////////////////////////
// ERROR HANDLING //////////////
////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Error: ", error);

    let errorMessage = "An unknown error ocurred!";
    let statusCode = 500;

    if(error instanceof Error) errorMessage = error.message;
    if(error instanceof CustomError) statusCode = error.statusCode;

    return res.status(statusCode).json({error: errorMessage})
})

///////////////////////////////
// EXPORT APP /////////////////
///////////////////////////////

export default app;