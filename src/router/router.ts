import express from "express";
import { tasksRouter } from "../v1/tasks/tasks.controller";

export const Router = express.Router();

// http://domain/v1/tasks
Router.use("/tasks", tasksRouter);