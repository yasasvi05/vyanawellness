import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Paper,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: '#6366f1' }} />,
      title: 'Emotion Detection',
      description: 'AI-powered analysis of your emotions from text inputs',
      color: '#6366f1'
    },
    {
      icon: <ChatBubbleIcon sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'AI Chatbot',
      description: '24/7 emotional support with adaptive responses',
      color: '#8b5cf6'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Peer Support',
      description: 'Anonymous group chats with people facing similar challenges',
      color: '#10b981'
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Progress Tracking',
      description: 'Monitor your emotional journey with detailed analytics',
      color: '#f59e0b'
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 10, color: 'white' }}>
          <PsychologyIcon sx={{ fontSize: 80, mb: 3, color: 'white' }} />
          <Typography variant="h1" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            VYANA
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 500, mb: 4, opacity: 0.9 }}>
            Real-time AI-Assisted Mental Wellness Platform
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, maxWidth: 800, mx: 'auto', opacity: 0.8 }}>
            Detect emotions, get adaptive support, connect with peers, and ensure safety through intelligent monitoring
          </Typography>
          
          {isAuthenticated ? (
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                bgcolor: 'white',
                color: '#6366f1',
                fontWeight: 700,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: '#f8fafc',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  bgcolor: 'white',
                  color: '#6366f1',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: '#f8fafc',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="outlined"
                size="large"
                sx={{
                  px: 6,
                  py: 2,
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  bgcolor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: feature.color }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button size="small" sx={{ color: feature.color }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Phase Info */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            bgcolor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, textAlign: 'center', mb: 4, color: '#333' }}>
            Development Phases
          </Typography>
          <Grid container spacing={3}>
            {[
              { phase: 'Phase 1', title: 'Core Foundation', features: ['User Auth', 'Emotion Check-in', 'AI Chatbot'] },
              { phase: 'Phase 2', title: 'Real-time Features', features: ['Peer Support Rooms', 'Mood Activities', 'Progress Dashboard'] },
              { phase: 'Phase 3', title: 'Safety Features', features: ['SOS Detection', 'Stress Mode', 'Emergency Contacts'] },
              { phase: 'Phase 4', title: 'Admin & Analytics', features: ['Admin Dashboard', 'Analytics', 'Moderation Tools'] },
            ].map((item, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}>
                    {item.phase}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    {item.title}
                  </Typography>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {item.features.map((feature, idx) => (
                      <li key={idx}>
                        <Typography variant="body1" color="text.secondary">
                          {feature}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;