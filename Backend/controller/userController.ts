import { Request, Response } from "express";
import User, { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
// Update profile by ID
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }

    user.email = email || user.email;
    user.phoneNumber =
      phoneNumber !== undefined ? phoneNumber : user.phoneNumber;

    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error updating profile" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User profile not found" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile" });
  }
};
