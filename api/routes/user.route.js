import test from "../controllers/user.controller.js";
import expres from "express"
const router = expres.Router();
router.get("/test", test)


export default router;