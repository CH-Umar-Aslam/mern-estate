import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.util.js";

export const UpdateUser = async (req, res, next) => {

  if (req.params.id !== req.user.id) return next(errorHandler(401, "Unauthenticated"));
  try {
    console.log(req.body.formData.password.length)
    if (req.body.formData.password) {
      req.body.formData.password = bcrypt.hashSync(req.body.formData.password, 10);
    }
    if (req.body.formData.username == "" || req.body.formData.email == "") {
      return next(errorHandler(400, "Invalid request"));

    }

    const updated = await User.findByIdAndUpdate(req.params.id, {
      $set:
      {
        username: req.body.formData.username,
        email: req.body.formData.email,
        password: req.body.formData.password,
        avatar: req.body.formData.avatar,
      }
    }, { new: true });
    updated.updatedAt
    const { password, ...rest } = updated._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error);
  }

}
export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) return next(errorHandler(402, "You can only delete your own account"));
  try {
    console.log("del user out")
    const findUser = await User.findByIdAndDelete(req.params.id);
    if (!findUser) {
      return next(errorHandler(404, "User not found"));
    }
    res.clearCookie("access_token");
    res.status(200).json({ message: "user deleted successfully" });

  } catch (error) {
    next(error);
  }
}
export const signOut = (req, res, next) => {
  try {
    console.log("sign out")
    res.clearCookie("access_token");
    res.status(200).json({ message: "user signed out successfully" });
  } catch (error) {
    next(error)
  }
}
