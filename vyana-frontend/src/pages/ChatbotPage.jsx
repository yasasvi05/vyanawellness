import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { motion, AnimatePresence } from "framer-motion";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello, I’m VYANA. I’m here with you. How are you feeling right now?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "I hear you. Would you like to share more about that?",
    "That sounds heavy. I’m glad you’re talking about it.",
    "Your feelings make sense. I’m here with you.",
    "Thank you for trusting me with that.",
    "Let’s take this one step at a time together.",
  ];

  const suggestedQuestions = [
    "I’m feeling anxious",
    "I need motivation",
    "Can you help me calm down?",
    "I feel overwhelmed",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const reply =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: reply,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
        py: 5,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ height: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              fontFamily: '"Playfair Display", serif',
              color: "#2e5c3e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <PsychologyIcon /> AI Wellness Companion
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            A calm space to express yourself freely
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flex: 1, gap: 3 }}>
          {/* Chat Area */}
          <Paper sx={{ ...glassCard, flex: 3, display: "flex", flexDirection: "column" }}>
            <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ maxWidth: "70%" }}>
                        {msg.sender === "bot" && (
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5, gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: "#4a7c59" }}>
                              <SmartToyIcon sx={{ fontSize: 14 }} />
                            </Avatar>
                            <Typography variant="caption" sx={{ color: "#5a8a6a" }}>
                              VYANA
                            </Typography>
                          </Box>
                        )}

                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            bgcolor:
                              msg.sender === "user"
                                ? "rgba(78,124,89,0.9)"
                                : "rgba(255,255,255,0.85)",
                            color: msg.sender === "user" ? "white" : "#2e5c3e",
                            borderRadius:
                              msg.sender === "user"
                                ? "18px 18px 4px 18px"
                                : "18px 18px 18px 4px",
                          }}
                        >
                          <Typography variant="body1">{msg.text}</Typography>
                        </Paper>

                        <Typography variant="caption" sx={{ color: "#7c9885", mt: 0.5 }}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}

                {isTyping && (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="caption" sx={{ color: "#5a8a6a" }}>
                      VYANA is thinking…
                    </Typography>
                  </Box>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </Box>

            {/* Input */}
            <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                {suggestedQuestions.map((q, i) => (
                  <Card
                    key={i}
                    component={motion.div}
                    whileHover={{ scale: 1.03 }}
                    sx={{ ...glassCard, cursor: "pointer" }}
                    onClick={() => setInputText(q)}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography variant="body2">{q}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Share what’s on your mind…"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  sx={{
                    bgcolor: "rgba(78,124,89,0.9)",
                    color: "white",
                    "&:hover": { bgcolor: "rgba(78,124,89,1)" },
                    "&:disabled": { bgcolor: "#c8e6c9" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>

          {/* Sidebar */}
          <Paper sx={{ ...glassCard, flex: 1, p: 3 }}>
            <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h6">
              Emotional Insight
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#5a8a6a", mb: 1 }}>
                Current tone
              </Typography>
              <Chip
                label="Reflective"
                sx={{ bgcolor: "rgba(78,124,89,0.15)", color: "#2e5c3e" }}
              />
            </Box>

            <Typography variant="body2" sx={{ color: "#5a8a6a" }}>
              You’re expressing yourself clearly. Take your time — there’s no rush
              here.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ChatbotPage;
