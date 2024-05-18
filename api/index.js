import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();
app.use(express.json());

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

app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const errorMessage = err.message || "invalid server error"
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    status: statusCode
  })
})
