import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import GroupsIcon from "@mui/icons-material/Groups";
import InsightsIcon from "@mui/icons-material/Insights";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [isHovering, setIsHovering] = useState(false);

  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 40, color: "#7c9885" }} />,
      title: "Emotion Detection",
      description: "Gentle AI-powered analysis of your emotions",
      color: "#7c9885"
    },
    {
      icon: <ChatBubbleIcon sx={{ fontSize: 40, color: "#a8b5a1" }} />,
      title: "AI Chatbot",
      description: "Compassionate support, available anytime",
      color: "#a8b5a1"
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: "#8fa89e" }} />,
      title: "Peer Support",
      description: "Connect with others in a safe space",
      color: "#8fa89e"
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: "#b8c5b0" }} />,
      title: "Progress Tracking",
      description: "Observe your journey with kindness",
      color: "#b8c5b0"
    },
  ];

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background meditation image that appears on hover */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isHovering ? 0.25 : 0,
          transition: "opacity 1.2s ease-in-out",
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />

      {/* Content overlay */}
      <Box sx={{ position: "relative", zIndex: 1, py: 8 }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Box
              sx={{
                display: "inline-block",
                p: 3,
                borderRadius: "50%",
                bgcolor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                mb: 3,
                transition: "all 0.6s ease",
                "&:hover": {
                  transform: "scale(1.1) rotate(5deg)",
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                }
              }}
            >
              <PsychologyIcon sx={{ fontSize: 80, color: "#4a7c59" }} />
            </Box>
            
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 300, 
                mb: 2, 
                fontSize: { xs: "3rem", md: "5rem" },
                color: "#2e5c3e",
                letterSpacing: "0.05em",
                fontFamily: '"Playfair Display", serif',
              }}
            >
              VYANA
            </Typography>
            
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 300, 
                mb: 4, 
                color: "#4a7c59",
                fontStyle: "italic",
                letterSpacing: "0.02em",
              }}
            >
              Your sanctuary for mental wellness
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                maxWidth: 700, 
                mx: "auto", 
                color: "#5a8a6a",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              A peaceful space to understand your emotions, find support, and nurture your well-being through mindful technology
            </Typography>
            
            {isAuthenticated ? (
              <Button
                component={Link}
                to="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  px: 8,
                  py: 2.5,
                  bgcolor: "rgba(78, 124, 89, 0.9)",
                  color: "white",
                  fontWeight: 400,
                  fontSize: "1rem",
                  borderRadius: 50,
                  textTransform: "none",
                  letterSpacing: "0.05em",
                  boxShadow: "0 4px 20px rgba(78, 124, 89, 0.3)",
                  "&:hover": {
                    bgcolor: "rgba(78, 124, 89, 1)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 30px rgba(78, 124, 89, 0.4)",
                  },
                  transition: "all 0.4s ease",
                }}
              >
                Enter Your Sanctuary
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 8,
                    py: 2.5,
                    bgcolor: "rgba(78, 124, 89, 0.9)",
                    color: "white",
                    fontWeight: 400,
                    fontSize: "1rem",
                    borderRadius: 50,
                    textTransform: "none",
                    letterSpacing: "0.05em",
                    boxShadow: "0 4px 20px rgba(78, 124, 89, 0.3)",
                    "&:hover": {
                      bgcolor: "rgba(78, 124, 89, 1)",
                      transform: "translateY(-3px)",
                      boxShadow: "0 8px 30px rgba(78, 124, 89, 0.4)",
                    },
                    transition: "all 0.4s ease",
                  }}
                >
                  Begin Your Journey
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 8,
                    py: 2.5,
                    borderColor: "rgba(78, 124, 89, 0.6)",
                    color: "#4a7c59",
                    fontWeight: 400,
                    fontSize: "1rem",
                    borderRadius: 50,
                    borderWidth: 2,
                    textTransform: "none",
                    letterSpacing: "0.05em",
                    "&:hover": {
                      bgcolor: "rgba(78, 124, 89, 0.08)",
                      borderColor: "rgba(78, 124, 89, 0.9)",
                      borderWidth: 2,
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.4s ease",
                  }}
                >
                  Create Account
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
                    height: "100%", 
                    display: "flex", 
                    flexDirection: "column",
                    bgcolor: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 4,
                    border: "1px solid rgba(255, 255, 255, 0.5)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.5s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
                      bgcolor: "rgba(255, 255, 255, 0.85)",
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 4 }}>
                    <Box 
                      sx={{ 
                        mb: 3,
                        transition: "transform 0.5s ease",
                        "&:hover": {
                          transform: "scale(1.15) rotate(5deg)",
                        }
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 500, 
                        color: feature.color,
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#5a6c5a",
                        lineHeight: 1.7,
                        fontWeight: 300,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                    <Button 
                      size="small" 
                      sx={{ 
                        color: feature.color,
                        textTransform: "none",
                        fontWeight: 400,
                        "&:hover": {
                          bgcolor: "rgba(124, 152, 133, 0.1)",
                        }
                      }}
                    >
                      Explore →
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
              p: 6, 
              bgcolor: "rgba(255, 255, 255, 0.75)",
              backdropFilter: "blur(20px)",
              borderRadius: 6,
              border: "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 300, 
                textAlign: "center", 
                mb: 6, 
                color: "#2e5c3e",
                letterSpacing: "0.02em",
              }}
            >
              Our Roadmap to Wellness
            </Typography>
            <Grid container spacing={4}>
              {[
                { phase: "Phase 1", title: "Foundation", features: ["User Authentication", "Emotion Check-in", "AI Support"] },
                { phase: "Phase 2", title: "Connection", features: ["Peer Support", "Mood Activities", "Progress Insights"] },
                { phase: "Phase 3", title: "Safety", features: ["Crisis Detection", "Calm Mode", "Emergency Resources"] },
                { phase: "Phase 4", title: "Growth", features: ["Admin Dashboard", "Analytics", "Community Tools"] },
              ].map((item, index) => (
                <Grid item xs={12} md={3} key={index}>
                  <Box 
                    sx={{ 
                      p: 3,
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: "translateX(8px)",
                      }
                    }}
                  >
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        color: "#7c9885", 
                        fontWeight: 600, 
                        fontSize: "0.75rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.phase}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 500, 
                        mb: 2, 
                        color: "#2e5c3e",
                        mt: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box component="ul" sx={{ paddingLeft: "1.2rem", m: 0 }}>
                      {item.features.map((feature, idx) => (
                        <Box component="li" key={idx} sx={{ mb: 1 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: "#5a8a6a",
                              fontWeight: 300,
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Calming Footer Quote */}
          <Box sx={{ textAlign: "center", mt: 8, mb: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: "#4a7c59",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "0.02em",
                opacity: 0.8,
              }}
            >
              "Peace comes from within. Do not seek it without."
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
