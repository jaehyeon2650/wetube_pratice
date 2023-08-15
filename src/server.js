import "./db";
import "./init";
import express from "express";
import morgan from "morgan";
import grobalRouter from "./routers/grobalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
const app = express();
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", grobalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
export default app;
