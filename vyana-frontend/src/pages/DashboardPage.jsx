import React, { useState } from "react";
import {
  Container,
  Grid,
  
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from "@mui/material";

import PsychologyIcon from "@mui/icons-material/Psychology";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsightsIcon from "@mui/icons-material/Insights";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [moodText, setMoodText] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { value: "happy", label: "Happy", icon: <MoodIcon />, color: "#4a7c59" },
    { value: "neutral", label: "Neutral", icon: <SentimentSatisfiedIcon />, color: "#7c9885" },
    { value: "sad", label: "Sad", icon: <SentimentDissatisfiedIcon />, color: "#5a8a6a" },
    { value: "anxious", label: "Anxious", icon: <SentimentVeryDissatisfiedIcon />, color: "#8fa89e" },
    { value: "angry", label: "Angry", icon: <SentimentVeryDissatisfiedIcon />, color: "#c05656" },
  ];

  const moodData = [
    { day: "Mon", mood: 4 },
    { day: "Tue", mood: 3 },
    { day: "Wed", mood: 5 },
    { day: "Thu", mood: 2 },
    { day: "Fri", mood: 4 },
    { day: "Sat", mood: 5 },
    { day: "Sun", mood: 3 },
  ];

  const quickStats = [
    { label: "Current Streak", value: "7 days", icon: <TrendingUpIcon />, color: "#4a7c59" },
    { label: "Avg. Mood", value: "3.8 / 5", icon: <PsychologyIcon />, color: "#2e5c3e" },
    { label: "Check-ins", value: "24", icon: <AccessTimeIcon />, color: "#7c9885" },
    { label: "Progress", value: "+12%", icon: <InsightsIcon />, color: "#8fa89e" },
  ];

  const handleMoodSubmit = () => {
    if (!moodText.trim() && !selectedMood) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setMoodText("");
      setSelectedMood(null);
    }, 1500);
  };

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
        {/* Welcome */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              fontFamily: '"Playfair Display", serif',
              color: "#2e5c3e",
            }}
          >
            Welcome back, {user?.name} 🌿
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            Take a gentle moment to check in with yourself
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left */}
          <Grid item xs={12} lg={8}>
            {/* Check-in */}
            <Card sx={{ ...glassCard, mb: 4 }}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h5">
                  Daily Emotional Check-in
                </Typography>

                <ToggleButtonGroup
                  value={selectedMood}
                  exclusive
                  onChange={(e, v) => setSelectedMood(v)}
                  sx={{ mb: 3, flexWrap: "wrap" }}
                >
                  {moodOptions.map((m) => (
                    <ToggleButton
                      key={m.value}
                      value={m.value}
                      sx={{
                        borderColor: m.color,
                        color: m.color,
                        "&.Mui-selected": {
                          bgcolor: `${m.color}20`,
                        },
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        {m.icon}
                        <Typography variant="caption">{m.label}</Typography>
                      </Box>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Describe how you’re feeling…"
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                />

                <Button
                  onClick={handleMoodSubmit}
                  disabled={isAnalyzing || (!moodText && !selectedMood)}
                  sx={{
                    mt: 3,
                    bgcolor: "rgba(78,124,89,0.9)",
                    color: "white",
                    textTransform: "none",
                    "&:hover": { bgcolor: "rgba(78,124,89,1)" },
                  }}
                >
                  {isAnalyzing ? (
                    <>
                      <CircularProgress size={18} sx={{ mr: 1 }} /> Analyzing…
                    </>
                  ) : (
                    "Check In"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h5">
                  Weekly Mood Trends
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={moodData}>
                      <CartesianGrid stroke="#e0e0e0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#4a7c59"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {quickStats.map((s, i) => (
                <Grid item xs={6} key={i}>
                  <Card sx={glassCard}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ color: s.color }}>{s.icon}</Box>
                      <Typography sx={{ color: s.color }} variant="h4">
                        {s.value}
                      </Typography>
                      <Typography sx={{ color: "#5a8a6a" }}>
                        {s.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h5">
                  Quick Actions
                </Typography>
                <Button fullWidth sx={{ mb: 1 }} href="/chat">
                  💬 Talk to VYANA
                </Button>
                <Button fullWidth sx={{ mb: 1 }} href="/activities">
                  🧘 Relaxation Activities
                </Button>
                <Button fullWidth href="/activities?tab=journal">
                  📝 Journal Prompt
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
