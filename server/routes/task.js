import express from "express";
import { getTasks, createTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.get("/:userId", getTasks);
router.post("/", createTask);
router.put("/:taskId", updateTask);
//router.delete("/deleteTask", deleteTask);

export default router;
