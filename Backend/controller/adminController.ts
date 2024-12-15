// src/controllers/AdminController.ts
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
