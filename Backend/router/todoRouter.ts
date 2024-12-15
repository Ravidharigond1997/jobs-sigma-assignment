import express from "express";
import { verifyUser } from "../middleware/authorization";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/taskController";

const router = express.Router();

router.post("/", verifyUser, createTodo);
router.get("/", verifyUser, getTodos);
router.put("/:id", verifyUser, updateTodo);
router.delete("/:id", verifyUser, deleteTodo);

export default router;
