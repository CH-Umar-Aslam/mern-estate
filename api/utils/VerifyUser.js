import jwt from "jsonwebtoken";
import { errorHandler } from "./error.util.js";

export const VerifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (!token) return errorHandler(404, "Invalid token")
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is not valid" });
      }
      req.user = user;
    })

    next();
  } catch (error) {
    next(error)
  }

}