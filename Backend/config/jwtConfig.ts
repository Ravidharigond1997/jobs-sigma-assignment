import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secreteKey = "Hello123";
const generateToken = (id) => {
  return jwt.sign({ id }, secreteKey, {
    expiresIn: "7d",
  });
};

export default generateToken;
