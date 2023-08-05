import express from "express";
import morgan from "morgan";
import grobalRouter from "./routers/grobalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();
const logger = morgan("dev");

app.use(logger);
app.use("/", grobalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
const handleListening = () => {
    console.log("Server listening on port 4000");
}
app.listen(4000, handleListening);