
import express, { Request, Response } from "express";

const app = express();

const port = 5000;

app.get("/", (req: Request, res: Response) => {

    return res.send("Hello world!")

})

app.listen(port, () => {

    console.log(`App is running in port: ${port}`)

})
