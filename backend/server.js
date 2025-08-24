import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug log (to verify .env is loading)
console.log("Mongo URI from .env:", process.env.MONGO_URI);

// MongoDB connection
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
import skillsRoutes from "./routes/skills.js";
import projectsRoutes from "./routes/projects.js";
import bioRoutes from "./routes/bio.js"; // ✅ new bio route
import contactRoutes from "./routes/contact.js";

app.use("/api/skills", skillsRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/bio", bioRoutes); // ✅ register bio API
app.use("/api/contact", contactRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
