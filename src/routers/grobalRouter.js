import express from "express";
import { trending, search } from "../controllers/videoControllers";
import { login, join } from "../controllers/userControllers";
const grobalRouter = express.Router();
grobalRouter.get("/", trending);
grobalRouter.get("/join", join);
grobalRouter.get("/login", login);
grobalRouter.get("/search", search);

export default grobalRouter;