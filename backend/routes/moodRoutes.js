const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Mood = require("../models/Mood");

const router = express.Router();

/* ======================
   ADD MOOD CHECK-IN
   ====================== */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { mood, score, text } = req.body;

    if (!mood || !score) {
      return res.status(400).json({ message: "Mood and score are required" });
    }

    const newMood = new Mood({
      userId: req.user.id,
      mood,
      score,
      text,
    });

    await newMood.save();

    res.status(201).json({ message: "Mood saved successfully" });
  } catch (error) {
    console.error("ADD MOOD ERROR 👉", error);
    res.status(500).json({ message: "Failed to save mood" });
  }
});

module.exports = router;
