import express from "express";
import { VerifyUser } from "../utils/VerifyUser.js";
import { UpdateUser, deleteUser, signOut } from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.post("/update/:id", VerifyUser, UpdateUser)
userRouter.delete("/delete/:id", VerifyUser, deleteUser)
userRouter.get("/sign-out/:id", VerifyUser, signOut)
export default userRouter;