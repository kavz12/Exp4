import express from "express";
import Skill from "../models/Skill.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all skills
router.get("/", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

// Add skill (Admin only)
router.post("/", verifyToken, requireAdmin, async (req, res) => {
  const skill = new Skill(req.body);
  await skill.save();
  res.json(skill);
});

export default router;
