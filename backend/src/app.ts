import "dotenv/config";
import express, {
    NextFunction,
    Request,
    Response,
} from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello wordl!");
})


////////////////////////////////
// ERROR HANDLING //////////////
////////////////////////////////

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Error: ", error);

    let errorMessage = "An unknown error ocurred!";

    if(error instanceof Error) errorMessage = error.message;

    return res.status(500).json({error: errorMessage})
})

///////////////////////////////
// EXPORT APP /////////////////
///////////////////////////////

export default app;