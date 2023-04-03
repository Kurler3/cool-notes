import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import app from "./app";

const port = env.PORT;

mongoose
  .connect(env.DATABASE_URI)
  .then(() => {
    console.log("Db connected");

    app.listen(port, () => {
      console.log(`App is running in port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to db...", err);

    process.exit(1);
  });
