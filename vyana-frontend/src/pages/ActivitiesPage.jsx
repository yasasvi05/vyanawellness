import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  LinearProgress,
  CircularProgress,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import api from "../api/axios";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const ActivitiesPage = () => {
  const [moods, setMoods] = useState([]);
  const [loadingMoods, setLoadingMoods] = useState(true);

  const [journalEntries, setJournalEntries] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [journalText, setJournalText] = useState("");

  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingProgress, setBreathingProgress] = useState(0);

  const breathingExercises = [
    { id: 1, title: "4-7-8 Breathing", description: "Calm anxiety and promote sleep" },
    { id: 2, title: "Box Breathing", description: "Improve focus and reduce stress" },
  ];

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a recent challenge you handled well.",
    "What would make today feel lighter?",
    "Write a note to your future self.",
  ];

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const moodRes = await api.get("/mood");
        setMoods(moodRes.data);

        const journalRes = await api.get("/journal");
        setJournalEntries(journalRes.data);
      } catch (error) {
        console.error("Failed to fetch data");
      } finally {
        setLoadingMoods(false);
      }
    };

    fetchData();
  }, []);

  /* ================= SAVE JOURNAL ================= */
  const submitJournal = async () => {
    if (!selectedPrompt || !journalText.trim()) return;

    try {
      await api.post("/journal/add", {
        prompt: selectedPrompt,
        content: journalText,
      });

      const res = await api.get("/journal");
      setJournalEntries(res.data);

      setSelectedPrompt(null);
      setJournalText("");
    } catch (error) {
      console.error("Journal save failed");
    }
  };

  /* ================= BREATHING ================= */
  const startBreathingExercise = () => {
    setBreathingActive(true);
    let p = 0;

    const interval = setInterval(() => {
      p++;
      setBreathingProgress(p);

      if (p <= 25) setBreathingPhase("inhale");
      else if (p <= 50) setBreathingPhase("hold");
      else if (p <= 75) setBreathingPhase("exhale");
      else setBreathingPhase("rest");

      if (p >= 100) {
        clearInterval(interval);
        setBreathingActive(false);
        setBreathingProgress(0);
      }
    }, 100);
  };

  const phaseColor = {
    inhale: "#4a7c59",
    hold: "#7c9885",
    exhale: "#5a8a6a",
    rest: "#8fa89e",
  }[breathingPhase];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)", py: 6 }}>
      <Container maxWidth="xl">

        {/* ================= MOOD HISTORY ================= */}
        <Typography variant="h5" sx={{ mb: 3, color: "#2e5c3e" }}>
          🌿 Your Mood History
        </Typography>

        {loadingMoods ? (
          <CircularProgress />
        ) : moods.length === 0 ? (
          <Typography sx={{ mb: 4 }}>
            🌱 No mood entries yet.
          </Typography>
        ) : (
          moods.map((mood) => (
            <Card key={mood._id} sx={{ ...glassCard, mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {mood.mood.toUpperCase()} ({mood.score}/5)
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  {mood.text || "No description"}
                </Typography>
                <Typography variant="caption">
                  {new Date(mood.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}

        {/* ================= JOURNAL ================= */}
        <Typography variant="h5" sx={{ mt: 6, mb: 3, color: "#2e5c3e" }}>
          📝 Journal Prompts
        </Typography>

        <Grid container spacing={2}>
          {journalPrompts.map((prompt, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={glassCard}>
                <CardContent>
                  <Typography sx={{ mb: 2, color: "#5a8a6a" }}>
                    {prompt}
                  </Typography>
                  <Button
                    sx={{ color: "#4a7c59", textTransform: "none" }}
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    Write →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedPrompt && (
          <Card sx={{ ...glassCard, mt: 4 }}>
            <CardContent>
              <Typography sx={{ mb: 2 }}>
                {selectedPrompt}
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="Write your thoughts..."
              />

              <Button
                sx={{
                  mt: 2,
                  bgcolor: "#4a7c59",
                  color: "white",
                  textTransform: "none",
                }}
                onClick={submitJournal}
              >
                Save Entry
              </Button>
            </CardContent>
          </Card>
        )}

        {/* ================= JOURNAL HISTORY ================= */}
        <Typography variant="h6" sx={{ mt: 6, mb: 2 }}>
          Your Journal Entries
        </Typography>

        {journalEntries.length === 0 ? (
          <Typography>No journal entries yet.</Typography>
        ) : (
          journalEntries.map((entry) => (
            <Card key={entry._id} sx={{ ...glassCard, mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {entry.prompt}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  {entry.content}
                </Typography>
                <Typography variant="caption">
                  {new Date(entry.date).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}

        {/* ================= BREATHING ================= */}
        <Typography sx={{ mt: 6, mb: 3, color: "#2e5c3e" }} variant="h5">
          Breathing Practices
        </Typography>

        <Grid container spacing={3}>
          {breathingExercises.map((exercise) => (
            <Grid item xs={12} md={6} key={exercise.id}>
              <motion.div whileHover={{ y: -6 }}>
                <Card sx={glassCard}>
                  <CardContent>
                    <Typography sx={{ color: "#2e5c3e", mb: 1 }}>
                      {exercise.title}
                    </Typography>
                    <Typography sx={{ color: "#5a8a6a", mb: 2 }}>
                      {exercise.description}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={startBreathingExercise}
                      sx={{
                        bgcolor: "rgba(78,124,89,0.9)",
                        borderRadius: 50,
                        textTransform: "none",
                      }}
                    >
                      Begin
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {breathingActive && (
          <Paper sx={{ ...glassCard, mt: 4, textAlign: "center", p: 5 }}>
            <Typography sx={{ color: phaseColor, mb: 2 }}>
              {breathingPhase.toUpperCase()}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={breathingProgress}
              sx={{
                height: 8,
                borderRadius: 4,
                "& .MuiLinearProgress-bar": { bgcolor: phaseColor },
              }}
            />
          </Paper>
        )}

      </Container>
    </Box>
  );
};

export default ActivitiesPage;
