import "./db";
import "./init";
import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import morgan from "morgan";
import grobalRouter from "./routers/grobalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localMiddleware } from "./middlewares";
const app = express();
const logger = morgan("dev");
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}))
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        next();
    })
})

app.use(localMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", grobalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
export default app;
