import express from "express";
import Bio from "../models/Bio.js";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get bio
router.get("/", async (req, res) => {
  const bio = await Bio.findOne();
  res.json(bio || {});
});

// Create/Update bio (Admin only)
router.put("/:id", verifyToken, requireAdmin, async (req, res) => {
  const updated = await Bio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

export default router;
