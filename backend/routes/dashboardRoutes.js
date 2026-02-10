const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Mood = require("../models/Mood");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id });

    if (moods.length === 0) {
      return res.json({
        streak: 0,
        avgMood: null,
        totalCheckins: 0,
        weeklyData: [],
      });
    }

    const totalCheckins = moods.length;
    const avgMood =
      moods.reduce((sum, m) => sum + m.score, 0) / totalCheckins;

    // Simple weekly data (can improve later)
    const weeklyData = moods.slice(-7).map((m) => ({
      day: m.date.toLocaleDateString("en-US", { weekday: "short" }),
      mood: m.score,
    }));

    res.json({
      streak: 1, // placeholder (we’ll calculate properly later)
      avgMood: avgMood.toFixed(1),
      totalCheckins,
      weeklyData,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

module.exports = router;
