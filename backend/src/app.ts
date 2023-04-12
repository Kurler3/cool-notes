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
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";

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

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

// SETTING UP SESSION MIDDLEWARE
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000, // 1 HOUR,
    },
    rolling: true, // AS LONG AS USER IS USING IT, KEEP IT ALIVE
    store: MongoStore.create({
        mongoUrl: env.DATABASE_URI
    }),
}));


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