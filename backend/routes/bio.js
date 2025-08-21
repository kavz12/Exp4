import express from "express";
import Bio from "../models/Bio.js";

const router = express.Router();

// GET bio
router.get("/", async (req, res) => {
  try {
    const bio = await Bio.findOne(); // fetch single bio
    res.json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bio (create new)
router.post("/", async (req, res) => {
  try {
    const bio = new Bio(req.body);
    await bio.save();
    res.status(201).json(bio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT bio (update existing)
router.put("/:id", async (req, res) => {
  try {
    const bio = await Bio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(bio);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE bio
router.delete("/:id", async (req, res) => {
  try {
    await Bio.findByIdAndDelete(req.params.id);
    res.json({ message: "Bio deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
