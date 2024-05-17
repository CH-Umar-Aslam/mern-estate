
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import { errorHandler } from "../utils/error.util.js";
const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword
  })

  try {
    await newUser.save();
    res.status(200).json("account created successfully")
  } catch (error) {
    next(errorHandler(550, "error by function"))
  }

}

export default signUp