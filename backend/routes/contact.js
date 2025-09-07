import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// Submit contact form
router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Message received" });
});

export default router;
