import express from "express";
import Project from "../models/Project.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add project (Admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

export default router;
