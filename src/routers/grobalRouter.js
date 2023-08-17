import express from "express";
import { trending, search } from "../controllers/videoControllers";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";
const grobalRouter = express.Router();
grobalRouter.get("/", trending);
grobalRouter.route("/join").get(getJoin).post(postJoin);
grobalRouter.route("/login").get(getLogin).post(postLogin);
grobalRouter.get("/search", search);

export default grobalRouter;