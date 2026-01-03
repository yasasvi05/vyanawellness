import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsightsIcon from '@mui/icons-material/Insights';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [moodText, setMoodText] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moodOptions = [
    { value: 'happy', label: 'Happy', icon: <MoodIcon />, color: '#10b981' },
    { value: 'neutral', label: 'Neutral', icon: <SentimentSatisfiedIcon />, color: '#f59e0b' },
    { value: 'sad', label: 'Sad', icon: <SentimentDissatisfiedIcon />, color: '#3b82f6' },
    { value: 'anxious', label: 'Anxious', icon: <SentimentVeryDissatisfiedIcon />, color: '#8b5cf6' },
    { value: 'angry', label: 'Angry', icon: <SentimentVeryDissatisfiedIcon />, color: '#ef4444' },
  ];

  const moodData = [
    { day: 'Mon', mood: 4 },
    { day: 'Tue', mood: 3 },
    { day: 'Wed', mood: 5 },
    { day: 'Thu', mood: 2 },
    { day: 'Fri', mood: 4 },
    { day: 'Sat', mood: 5 },
    { day: 'Sun', mood: 3 },
  ];

  const quickStats = [
    { label: 'Current Streak', value: '7 days', icon: <TrendingUpIcon />, color: '#10b981' },
    { label: 'Avg. Mood', value: '3.8/5', icon: <PsychologyIcon />, color: '#6366f1' },
    { label: 'Check-ins', value: '24', icon: <AccessTimeIcon />, color: '#f59e0b' },
    { label: 'Progress', value: '+12%', icon: <InsightsIcon />, color: '#8b5cf6' },
  ];

  const handleMoodSubmit = () => {
    if (!moodText.trim() && !selectedMood) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setMoodText('');
      setSelectedMood(null);
    }, 1500);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back, {user?.name} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          How are you feeling today? Take a moment to check in.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Mood Check-in */}
        <Grid item xs={12} lg={8}>
          {/* Daily Check-in Card */}
          <Card 
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{ mb: 3 }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PsychologyIcon /> Daily Emotional Check-in
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  How are you feeling right now?
                </Typography>
                <ToggleButtonGroup
                  value={selectedMood}
                  exclusive
                  onChange={(e, value) => setSelectedMood(value)}
                  sx={{ mb: 2 }}
                >
                  {moodOptions.map((mood) => (
                    <ToggleButton 
                      key={mood.value} 
                      value={mood.value}
                      sx={{ 
                        borderColor: selectedMood === mood.value ? mood.color : '#e5e7eb',
                        color: selectedMood === mood.value ? mood.color : '#666',
                        '&.Mui-selected': {
                          bgcolor: `${mood.color}15`,
                          color: mood.color,
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1 }}>
                        {mood.icon}
                        <Typography variant="caption" sx={{ mt: 0.5 }}>
                          {mood.label}
                        </Typography>
                      </Box>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                  Or describe your feelings in words:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Type how you're feeling today... (AI will analyze your emotions)"
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                onClick={handleMoodSubmit}
                disabled={isAnalyzing || (!moodText.trim() && !selectedMood)}
                sx={{
                  bgcolor: '#6366f1',
                  '&:hover': { bgcolor: '#4f46e5' },
                  minWidth: 200,
                }}
              >
                {isAnalyzing ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Analyzing...
                  </>
                ) : (
                  'Check In & Analyze'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Mood History Chart */}
          <Card component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Weekly Mood Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Stats & Quick Actions */}
        <Grid item xs={12} lg={4}>
          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {quickStats.map((stat, index) => (
              <Grid item xs={6} key={index}>
                <Card 
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 2 }}>
                    <Box sx={{ color: stat.color, mb: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Quick Actions */}
          <Card component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/chat'}
                >
                  💬 Talk to AI Assistant
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/peer-support'}
                >
                  👥 Join Support Room
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/activities'}
                >
                  🧘 Breathing Exercise
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: 'flex-start', py: 1.5 }}
                  onClick={() => window.location.href = '/activities?tab=journal'}
                >
                  📝 Journal Prompt
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  { time: '2 hours ago', activity: 'Completed breathing exercise', mood: 'happy' },
                  { time: 'Yesterday', activity: 'Chatted with AI assistant', mood: 'neutral' },
                  { time: '2 days ago', activity: 'Joined exam stress room', mood: 'anxious' },
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1 }}>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: moodOptions.find(m => m.value === item.mood)?.color || '#6366f1' 
                    }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2">{item.activity}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;