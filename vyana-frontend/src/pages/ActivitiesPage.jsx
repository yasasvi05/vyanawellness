import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Slider,
  Paper,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { motion } from "framer-motion";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const ActivitiesPage = () => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const breathingExercises = [
    {
      id: 1,
      title: "4-7-8 Breathing",
      description: "Calm anxiety and promote sleep",
    },
    {
      id: 2,
      title: "Box Breathing",
      description: "Improve focus and reduce stress",
    },
  ];

  const musicTracks = [
    { title: "Calm Waves", artist: "Nature Sounds" },
    { title: "Focus Flow", artist: "Ambient Study" },
    { title: "Sleep Well", artist: "Soft Piano" },
  ];

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a recent challenge you handled well.",
    "What would make today feel lighter?",
    "Write a note to your future self.",
  ];

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
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              fontFamily: '"Playfair Display", serif',
              color: "#2e5c3e",
              mb: 1,
            }}
          >
            Wellness Activities
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            Gentle practices to support your mind and body
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Breathing */}
          <Grid item xs={12} lg={8}>
            <Typography sx={{ mb: 3, color: "#2e5c3e" }} variant="h5">
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
                            "&:hover": {
                              bgcolor: "rgba(78,124,89,1)",
                            },
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
                    "& .MuiLinearProgress-bar": {
                      bgcolor: phaseColor,
                    },
                  }}
                />
              </Paper>
            )}

            {/* Journal */}
            <Typography sx={{ mt: 6, mb: 3, color: "#2e5c3e" }} variant="h5">
              Journal Prompts
            </Typography>

            <Grid container spacing={2}>
              {journalPrompts.map((prompt, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card sx={glassCard}>
                    <CardContent>
                      <Typography sx={{ color: "#5a8a6a" }}>
                        {prompt}
                      </Typography>
                      <Button
                        sx={{ mt: 2, color: "#4a7c59", textTransform: "none" }}
                      >
                        Write →
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Music */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ ...glassCard, p: 4 }}>
              <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h6">
                Relaxation Music
              </Typography>

              <Typography>{musicTracks[currentTrack].title}</Typography>
              <Typography sx={{ color: "#5a8a6a", mb: 2 }}>
                {musicTracks[currentTrack].artist}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton
                  onClick={() =>
                    setCurrentTrack((p) => (p ? p - 1 : musicTracks.length - 1))
                  }
                >
                  <SkipNextIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>

                <IconButton
                  onClick={() => setMusicPlaying(!musicPlaying)}
                  sx={{
                    bgcolor: "rgba(78,124,89,0.9)",
                    color: "white",
                    "&:hover": {
                      bgcolor: "rgba(78,124,89,1)",
                    },
                  }}
                >
                  {musicPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>

                <IconButton
                  onClick={() =>
                    setCurrentTrack((p) => (p + 1) % musicTracks.length)
                  }
                >
                  <SkipNextIcon />
                </IconButton>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Slider sx={{ color: "#4a7c59" }} defaultValue={40} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ActivitiesPage;
