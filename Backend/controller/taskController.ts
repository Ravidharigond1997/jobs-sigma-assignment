import { Request, Response } from "express";
import Todo from "../models/todoTask";
import { IUser } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  // Check if user is available in request
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  try {
    const todo = new Todo({
      userId: req.user.id,
      title,
      description,
      status: "Pending",
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  // Check if user is available in request
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  // Check if user is available in request
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, description, status },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if user is available in request
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized. User not found." });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
