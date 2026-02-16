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
  Tabs,
  Tab,
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

/* ================= HEALING SOUNDS ================= */

const soundCategories = {
  anxiety: {
    title: "Anxiety Relief",
    embed: "https://www.youtube.com/embed/2OEL4P1Rz04",
  },
  focus: {
    title: "Deep Focus",
    embed: "https://www.youtube.com/embed/lFcSrYw-ARY",
  },
  sleep: {
    title: "Sleep Calm",
    embed: "https://www.youtube.com/embed/1ZYbU82GVz4",
  },
  nature: {
    title: "Nature Sounds",
    embed: "https://www.youtube.com/embed/eKFTSSKCzWA",
  },
};

const ActivitiesPage = () => {
  const [moods, setMoods] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [journalText, setJournalText] = useState("");

  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingProgress, setBreathingProgress] = useState(0);

  const [selectedSound, setSelectedSound] = useState("anxiety");

  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a recent challenge you handled well.",
    "What would make today feel lighter?",
    "Write a note to your future self.",
  ];

  const breathingExercises = [
    { id: 1, title: "4-7-8 Breathing", description: "Calm anxiety and promote sleep" },
    { id: 2, title: "Box Breathing", description: "Improve focus and reduce stress" },
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
        console.error("Data fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= FOCUS TIMER ================= */

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500);
  };

  /* ================= JOURNAL ================= */

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

        <Typography variant="h4" sx={{ mb: 5 }}>
          🌿 Self-Healing Hub
        </Typography>

        {/* ================= HEALING SOUNDS ================= */}

        <Card sx={{ ...glassCard, mb: 6 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              🎧 Healing Sounds
            </Typography>

            <Tabs
              value={selectedSound}
              onChange={(e, val) => setSelectedSound(val)}
              centered
            >
              {Object.keys(soundCategories).map((key) => (
                <Tab key={key} value={key} label={soundCategories[key].title} />
              ))}
            </Tabs>

            <Box sx={{ mt: 3 }}>
              <iframe
                width="100%"
                height="315"
                src={soundCategories[selectedSound].embed}
                title="Healing Sound"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Box>
          </CardContent>
        </Card>

        {/* ================= FOCUS TIMER ================= */}

        <Card sx={{ ...glassCard, mb: 6, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              ⏳ Focus Timer
            </Typography>

            <Typography variant="h3">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Typography>

            <Button onClick={startTimer} sx={{ mr: 1 }}>Start</Button>
            <Button onClick={pauseTimer} sx={{ mr: 1 }}>Pause</Button>
            <Button onClick={resetTimer}>Reset</Button>
          </CardContent>
        </Card>

        {/* ================= MOOD HISTORY ================= */}

        <Typography variant="h5" sx={{ mb: 3 }}>
          🌿 Your Mood History
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : moods.length === 0 ? (
          <Typography>No mood entries yet.</Typography>
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

        <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
          📝 Journal Prompts
        </Typography>

        <Grid container spacing={2}>
          {journalPrompts.map((prompt, i) => (
            <Grid item xs={12} md={6} key={i}>
              <motion.div whileHover={{ y: -6 }}>
                <Card sx={glassCard}>
                  <CardContent>
                    <Typography sx={{ mb: 2 }}>
                      {prompt}
                    </Typography>
                    <Button onClick={() => setSelectedPrompt(prompt)}>
                      Write →
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
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
              />

              <Button sx={{ mt: 2 }} onClick={submitJournal}>
                Save Entry
              </Button>
            </CardContent>
          </Card>
        )}
{/* ================= JOURNAL HISTORY ================= */}

<Typography variant="h6" sx={{ mt: 6, mb: 2 }}>
  📖 Your Journal Entries
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

        <Typography sx={{ mt: 6, mb: 3 }} variant="h5">
          🧘 Breathing Practices
        </Typography>

        <Grid container spacing={3}>
          {breathingExercises.map((exercise) => (
            <Grid item xs={12} md={6} key={exercise.id}>
              <motion.div whileHover={{ y: -6 }}>
                <Card sx={glassCard}>
                  <CardContent>
                    <Typography sx={{ mb: 1 }}>
                      {exercise.title}
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                      {exercise.description}
                    </Typography>
                    <Button fullWidth onClick={startBreathingExercise}>
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
            <LinearProgress variant="determinate" value={breathingProgress} />
          </Paper>
        )}

      </Container>
    </Box>
  );
};

export default ActivitiesPage;
