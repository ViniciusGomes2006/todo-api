import express from "express";
import { randomUUID } from "node:crypto";
import { dbTasks } from "./tasks.database";

export const tasksRouter = express.Router();

// http://domain/v1/tasks
tasksRouter.get("/", express.json(), async (req, res) => {
  const tasks = dbTasks;

	return res.status(200).json(tasks);
});

// http://domain/v1/tasks
tasksRouter.post("/", express.json(), async (req, res) => {
  const { title, description } = req.body;

  const checkRequest = title && description
  const checkRequestIsString = typeof title === "string" && typeof description === "string"

  if (!checkRequest || !checkRequestIsString) {
    return res.status(400).json({
      message: "Missing title or description. Title and description are required",
    });
  }

  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  dbTasks.push(task);

  return res.status(201).json(task);
})


// http://domain/v1/tasks/:id
tasksRouter.put("/:id", express.json(), async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const checkRequest = title || description

  if (!checkRequest) {
    return res.status(400).json({
      message: "Missing title or description. Title or description are required",
    });
  }

  const task = dbTasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.updated_at = new Date();
  
  res.status(200).json(task);
})

// http://domain/v1/tasks/:id
tasksRouter.delete("/:id", express.json(), async (req, res) => {
  const { id } = req.params;

  const task = dbTasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  dbTasks.splice(dbTasks.indexOf(task), 1);

  return res.status(204)
})

// http://domain/v1/tasks/:id/complete
tasksRouter.patch("/:id/complete", express.json(), async (req, res) => {
  const { id } = req.params;

  const task = dbTasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.completed_at = new Date();
  task.updated_at = new Date();

  return res.json(task);
})