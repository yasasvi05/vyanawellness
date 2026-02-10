import React, { useState, useEffect } from "react";
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
import api from "../api/axios";

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

  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  const moodOptions = [
    { value: "happy", label: "Happy", icon: <MoodIcon />, score: 5, color: "#4a7c59" },
    { value: "neutral", label: "Neutral", icon: <SentimentSatisfiedIcon />, score: 3, color: "#7c9885" },
    { value: "sad", label: "Sad", icon: <SentimentDissatisfiedIcon />, score: 2, color: "#5a8a6a" },
    { value: "anxious", label: "Anxious", icon: <SentimentVeryDissatisfiedIcon />, score: 2, color: "#8fa89e" },
    { value: "angry", label: "Angry", icon: <SentimentVeryDissatisfiedIcon />, score: 1, color: "#c05656" },
  ];

  /* ======================
     FETCH DASHBOARD DATA
     ====================== */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to load dashboard");
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboard();
  }, []);

  const moodData = dashboardData?.weeklyData || [];

  const quickStats = [
    {
      label: "Current Streak",
      value: dashboardData?.streak ?? "0 days",
      icon: <TrendingUpIcon />,
      color: "#4a7c59",
    },
    {
      label: "Avg. Mood",
      value: dashboardData?.avgMood ?? "—",
      icon: <PsychologyIcon />,
      color: "#2e5c3e",
    },
    {
      label: "Check-ins",
      value: dashboardData?.totalCheckins ?? "0",
      icon: <AccessTimeIcon />,
      color: "#7c9885",
    },
  ];

  /* ======================
     MOOD SUBMIT (FRONTEND ONLY FOR NOW)
     ====================== */
  const handleMoodSubmit = async () => {
  if (!moodText.trim() && !selectedMood) return;

  const selected = moodOptions.find((m) => m.value === selectedMood);

  if (!selected) return;

  setIsAnalyzing(true);

  try {
    await api.post("/mood/add", {
      mood: selected.value,
      score: selected.score,
      text: moodText,
    });

    // Refresh dashboard data after save
    const res = await api.get("/dashboard");
    setDashboardData(res.data);

    setMoodText("");
    setSelectedMood(null);
  } catch (error) {
    console.error("Mood submit failed");
  } finally {
    setIsAnalyzing(false);
  }
};


  if (loadingDashboard) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

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
          {/* LEFT */}
          <Grid item xs={12} lg={8}>
            {/* CHECK-IN */}
            <Card sx={{ ...glassCard, mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: "#2e5c3e", mb: 2 }}>
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

            {/* CHART */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography variant="h5" sx={{ color: "#2e5c3e", mb: 2 }}>
                  Weekly Mood Trends
                </Typography>

                {moodData.length === 0 ? (
                  <Typography sx={{ color: "#5a8a6a" }}>
                    🌱 No mood data yet. Start your first check-in today.
                  </Typography>
                ) : (
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
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT */}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {quickStats.map((s, i) => (
                <Grid item xs={6} key={i}>
                  <Card sx={glassCard}>
                    <CardContent sx={{ textAlign: "center" }}>
                      <Box sx={{ color: s.color }}>{s.icon}</Box>
                      <Typography variant="h4" sx={{ color: s.color }}>
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
                <Typography variant="h5" sx={{ color: "#2e5c3e", mb: 2 }}>
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
