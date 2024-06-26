import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.util.js";

export const UpdateUser = async (req, res, next) => {
  console.log(req.body.formData.username);
  if (req.params.id !== req.user.id) return next(errorHandler(401, "Unauthenticated"));
  try {
    if (req.body.formData.password) {
      req.body.formData.password = bcrypt.hashSync(req.body.formData.password, 10);
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

