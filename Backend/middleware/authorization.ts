import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user";

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload & { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ error: "Unauthorized. User not found." });
      }

      if (user.role !== "Admin") {
        return res
          .status(403)
          .json({ error: "Access forbidden. User is not an admin." });
      }

      req.user = user; // Attach the user object to the request
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Not authorized, token verification failed." });
    }
  } else {
    return res
      .status(401)
      .json({ error: "Not authorized, no token provided." });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload & { id: string };

      if (!decoded || !decoded.id) {
        return res.status(401).json({ error: "Invalid token." });
      }

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ error: "Unauthorized. User not found." });
      }

      req.user = user; // Attach the user object to the request
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Not authorized, token verification failed." });
    }
  } else {
    return res
      .status(401)
      .json({ error: "Not authorized, no token provided." });
  }
};
