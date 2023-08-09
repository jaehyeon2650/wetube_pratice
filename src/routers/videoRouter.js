import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload } from "../controllers/videoControllers";
const videoRouter = express.Router();
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", remove);
videoRouter.route("/upload").get(getUpload).post(postUpload);
export default videoRouter;