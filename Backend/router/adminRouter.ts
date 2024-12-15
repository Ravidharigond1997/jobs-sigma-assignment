import express from "express";
import { protect } from "../middleware/authorization";
import { getAllUsers, createUser } from "../controller/adminController";

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.post("/users", protect, createUser);

export default router;
