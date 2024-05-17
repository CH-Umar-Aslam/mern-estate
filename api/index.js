import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.route.js";
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB")
  })
  .catch((err) => {
    console.log(err);
  })

app.listen(3000, () => {
  console.log("server is listening at PORT 3000")
})

app.use("/api/user", userRouter)