import express from "express";
import { logout, edit, remove, see } from "../controllers/userControllers";
const userRouter = express.Router();
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id(\\d+)", see);

export default userRouter;