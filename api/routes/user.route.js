import express from "express";
import { VerifyUser } from "../utils/VerifyUser.js";
import { UpdateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.post("/update/:id", VerifyUser, UpdateUser)
export default userRouter;