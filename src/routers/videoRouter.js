import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload } from "../controllers/videoControllers";
import { videoUpload } from "../middlewares";
const videoRouter = express.Router();
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", remove);
videoRouter.route("/upload").get(getUpload).post(videoUpload.single("video"), postUpload);
export default videoRouter;