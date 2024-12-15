import express from "express";
import { getProfile, updateProfile } from "../controller/userController";
import { verifyUser } from "../middleware/authorization";
import { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const router = express.Router();

router.put("/:id", verifyUser, updateProfile);
router.get("/:id", verifyUser, getProfile);

export default router;
