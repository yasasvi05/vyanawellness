import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
  Slider,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  LinearProgress,
} from '@mui/material';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import BookIcon from '@mui/icons-material/Book';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import TimerIcon from '@mui/icons-material/Timer';
import { motion } from 'framer-motion';

const ActivitiesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'breathing', label: 'Breathing', icon: <SelfImprovementIcon /> },
    { id: 'music', label: 'Music', icon: <LibraryMusicIcon /> },
    { id: 'journal', label: 'Journal', icon: <BookIcon /> },
    { id: 'exercise', label: 'Exercise', icon: <FitnessCenterIcon /> },
  ];

  const breathingExercises = [
    {
      id: 1,
      title: '4-7-8 Breathing',
      description: 'Calm anxiety and promote sleep',
      duration: '5 mins',
      difficulty: 'Easy',
      steps: [
        'Inhale through nose for 4 seconds',
        'Hold breath for 7 seconds',
        'Exhale through mouth for 8 seconds',
        'Repeat 4 times',
      ],
    },
    {
      id: 2,
      title: 'Box Breathing',
      description: 'Improve focus and reduce stress',
      duration: '4 mins',
      difficulty: 'Easy',
      steps: [
        'Inhale for 4 seconds',
        'Hold for 4 seconds',
        'Exhale for 4 seconds',
        'Hold for 4 seconds',
        'Repeat 5 times',
      ],
    },
    {
      id: 3,
      title: 'Deep Belly Breathing',
      description: 'Activate relaxation response',
      duration: '3 mins',
      difficulty: 'Beginner',
      steps: [
        'Place hand on belly',
        'Inhale deeply through nose',
        'Feel belly expand',
        'Exhale slowly through mouth',
        'Repeat 10 times',
      ],
    },
  ];

  const musicTracks = [
    {
      id: 1,
      title: 'Calm Waves',
      artist: 'Nature Sounds',
      duration: '10:00',
      mood: 'Relaxation',
    },
    {
      id: 2,
      title: 'Focus Flow',
      artist: 'Ambient Study',
      duration: '15:00',
      mood: 'Concentration',
    },
    {
      id: 3,
      title: 'Anxiety Relief',
      artist: 'Healing Frequencies',
      duration: '8:00',
      mood: 'Calm',
    },
    {
      id: 4,
      title: 'Sleep Well',
      artist: 'Soft Piano',
      duration: '20:00',
      mood: 'Sleep',
    },
  ];

  const journalPrompts = [
    'What are three things you\'re grateful for today?',
    'Describe a recent challenge and how you handled it',
    'What does your ideal day look like?',
    'Write a letter to your future self',
    'What small win can you celebrate today?',
  ];

  const startBreathingExercise = () => {
    if (!breathingActive) {
      setBreathingActive(true);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        setBreathingProgress(progress);
        
        // Cycle through phases
        if (progress <= 25) setBreathingPhase('inhale');
        else if (progress <= 50) setBreathingPhase('hold');
        else if (progress <= 75) setBreathingPhase('exhale');
        else if (progress <= 100) setBreathingPhase('rest');
        
        if (progress >= 100) {
          clearInterval(interval);
          setBreathingActive(false);
          setBreathingProgress(0);
          setBreathingPhase('inhale');
        }
      }, 100);
    } else {
      setBreathingActive(false);
    }
  };

  const getBreathingPhaseColor = () => {
    switch (breathingPhase) {
      case 'inhale': return '#10b981';
      case 'hold': return '#f59e0b';
      case 'exhale': return '#3b82f6';
      case 'rest': return '#8b5cf6';
      default: return '#6366f1';
    }
  };

  const getBreathingInstructions = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
      case 'rest': return 'Rest...';
      default: return 'Get Ready...';
    }
  };

  const filteredActivities = breathingExercises.filter(activity => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'breathing') return true;
    return false;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SelfImprovementIcon sx={{ color: '#6366f1' }} /> Wellness Activities
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Personalized recommendations based on your mood and needs
        </Typography>
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <ToggleButtonGroup
          value={activeCategory}
          exclusive
          onChange={(e, value) => setActiveCategory(value)}
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          {categories.map((category) => (
            <ToggleButton 
              key={category.id} 
              value={category.id}
              sx={{ 
                borderColor: activeCategory === category.id ? '#6366f1' : '#e5e7eb',
                color: activeCategory === category.id ? '#6366f1' : '#666',
                '&.Mui-selected': {
                  bgcolor: '#f5f3ff',
                  color: '#6366f1',
                }
              }}
            >
              {category.icon}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {category.label}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Breathing Exercises */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Breathing Exercises
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {filteredActivities.map((exercise) => (
              <Grid item xs={12} md={6} key={exercise.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                >
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {exercise.title}
                        </Typography>
                        <Chip 
                          label={exercise.difficulty} 
                          size="small" 
                          sx={{ 
                            bgcolor: exercise.difficulty === 'Easy' ? '#d1fae5' : '#fef3c7',
                            color: exercise.difficulty === 'Easy' ? '#065f46' : '#92400e',
                          }}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {exercise.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <TimerIcon sx={{ fontSize: 16, mr: 1, color: '#666' }} />
                        <Typography variant="body2" color="text.secondary">
                          {exercise.duration}
                        </Typography>
                      </Box>
                      
                      <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                        {exercise.steps.map((step, index) => (
                          <li key={index}>
                            <Typography variant="body2" color="text.secondary">
                              {step}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={startBreathingExercise}
                        sx={{ bgcolor: '#6366f1' }}
                      >
                        Start Exercise
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Breathing Visualizer */}
          {breathingActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Paper sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: '#f8fafc' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: getBreathingPhaseColor() }}>
                  {getBreathingInstructions()}
                </Typography>
                
                <Box sx={{ position: 'relative', width: 200, height: 200, mx: 'auto', mb: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: `${100 + breathingProgress}%`,
                      height: `${100 + breathingProgress}%`,
                      borderRadius: '50%',
                      bgcolor: `${getBreathingPhaseColor()}20`,
                      transition: 'all 2s ease-in-out',
                      animation: breathingPhase === 'inhale' ? 'pulse 4s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
                        '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      bgcolor: getBreathingPhaseColor(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <Typography variant="h3" fontWeight={700}>
                      {breathingPhase.charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                
                <LinearProgress 
                  variant="determinate" 
                  value={breathingProgress} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4, 
                    mb: 2,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getBreathingPhaseColor(),
                    },
                  }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Follow the circle - Expand on inhale, contract on exhale
                </Typography>
                
                <Button
                  variant="outlined"
                  onClick={() => setBreathingActive(false)}
                  sx={{ borderColor: '#6366f1', color: '#6366f1' }}
                >
                  Stop Exercise
                </Button>
              </Paper>
            </motion.div>
          )}

          {/* Journal Prompts */}
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Journal Prompts
          </Typography>
          <Grid container spacing={2}>
            {journalPrompts.map((prompt, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <BookIcon sx={{ color: '#6366f1', mt: 0.5 }} />
                      <Typography variant="body1">
                        {prompt}
                      </Typography>
                    </Box>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ mt: 2, color: '#6366f1' }}
                      onClick={() => window.location.href = '/chat'}
                    >
                      Write in Journal →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column - Music Player */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3, bgcolor: '#f8fafc' }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <LibraryMusicIcon /> Relaxation Music
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {musicTracks[currentTrack].title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {musicTracks[currentTrack].artist}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip 
                  label={musicTracks[currentTrack].mood} 
                  size="small"
                  sx={{ bgcolor: '#dbeafe', color: '#1e40af' }}
                />
                <Typography variant="body2" color="text.secondary">
                  {musicTracks[currentTrack].duration}
                </Typography>
              </Box>
            </Box>
            
            {/* Music Player Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <IconButton onClick={() => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : musicTracks.length - 1))}>
                <SkipNextIcon sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
              <IconButton
                onClick={() => setMusicPlaying(!musicPlaying)}
                sx={{ bgcolor: '#6366f1', color: 'white', '&:hover': { bgcolor: '#4f46e5' } }}
              >
                {musicPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => setCurrentTrack((prev) => (prev < musicTracks.length - 1 ? prev + 1 : 0))}>
                <SkipNextIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <VolumeUpIcon />
              <Slider
                defaultValue={50}
                aria-label="Volume"
                sx={{ color: '#6366f1' }}
              />
            </Box>
          </Paper>
          
          {/* Track List */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Playlist
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {musicTracks.map((track, index) => (
                <Box
                  key={track.id}
                  onClick={() => setCurrentTrack(index)}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: currentTrack === index ? '#f5f3ff' : 'transparent',
                    border: currentTrack === index ? '1px solid #6366f1' : '1px solid transparent',
                    '&:hover': { bgcolor: '#f8fafc' },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: currentTrack === index ? 600 : 400 }}>
                    {track.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {track.artist} • {track.duration}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
          
          {/* Quick Tips */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Wellness Tips
            </Typography>
            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
              <li>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Practice deep breathing for 5 minutes daily
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Take short breaks every 90 minutes
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Stay hydrated throughout the day
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Write down 3 things you're grateful for
                </Typography>
              </li>
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivitiesPage;