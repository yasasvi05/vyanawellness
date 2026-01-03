import React, { useState, useRef, useEffect } from 'react';
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
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your VYANA assistant. How are you feeling today?", sender: 'bot', timestamp: new Date() },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const botResponses = [
    "I understand how you're feeling. Would you like to talk more about it?",
    "That's completely valid. Remember, it's okay to feel this way sometimes.",
    "I'm here to listen. What's been on your mind lately?",
    "Thank you for sharing that with me. How can I support you right now?",
    "I appreciate your honesty. Let's work through this together.",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "I'm feeling anxious about work",
    "How can I improve my mood?",
    "I need some motivation",
    "Tell me a calming exercise",
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4, height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <PsychologyIcon sx={{ color: '#6366f1' }} /> AI Wellness Assistant
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your 24/7 emotional support companion. Talk freely and confidentially.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flex: 1, gap: 3, height: '100%' }}>
        {/* Chat Container */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: 3, 
            display: 'flex', 
            flexDirection: 'column',
            border: '1px solid #e5e7eb',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {/* Messages Area */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3, bgcolor: '#fafafa' }}>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                      }}
                    >
                      {message.sender === 'bot' && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: '#6366f1' }}>
                            <SmartToyIcon sx={{ fontSize: 14 }} />
                          </Avatar>
                          <Typography variant="caption" color="text.secondary">
                            VYANA Assistant
                          </Typography>
                        </Box>
                      )}
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: message.sender === 'user' ? '#6366f1' : 'white',
                          color: message.sender === 'user' ? 'white' : 'inherit',
                          borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          border: message.sender === 'user' ? 'none' : '1px solid #e5e7eb',
                        }}
                      >
                        <Typography variant="body1">{message.text}</Typography>
                      </Paper>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
              
              {isTyping && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <Box sx={{ maxWidth: '70%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5, gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: '#6366f1' }}>
                        <SmartToyIcon sx={{ fontSize: 14 }} />
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        VYANA Assistant
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        bgcolor: 'white',
                        borderRadius: '18px 18px 18px 4px',
                        border: '1px solid #e5e7eb',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Thinking...
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </Box>

          {/* Input Area */}
          <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
            {/* Suggested Questions */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, overflowX: 'auto' }}>
              {suggestedQuestions.map((question, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputText(question)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { borderColor: '#6366f1' },
                    flexShrink: 0,
                  }}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography variant="body2">{question}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder="Type your message here... (Press Enter to send)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                sx={{
                  bgcolor: '#6366f1',
                  color: 'white',
                  '&:hover': { bgcolor: '#4f46e5' },
                  '&:disabled': { bgcolor: '#e5e7eb' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>

        {/* Sidebar - Emotion Analysis */}
        <Paper 
          elevation={0} 
          sx={{ 
            flex: 1, 
            p: 3, 
            border: '1px solid #e5e7eb',
            borderRadius: 3,
            bgcolor: '#f8fafc',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Emotion Analysis
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Current detected emotion:
            </Typography>
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 1,
              bgcolor: '#dbeafe',
              color: '#1e40af',
              px: 2,
              py: 1,
              borderRadius: 2,
            }}>
              <PsychologyIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" fontWeight={500}>
                Neutral / Reflective
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Conversation insights:
            </Typography>
            <Box sx={{ 
              p: 2, 
              bgcolor: 'white', 
              borderRadius: 2,
              border: '1px solid #e5e7eb',
            }}>
              <Typography variant="caption">
                You're expressing yourself clearly. The AI has detected a reflective mood pattern.
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Tips for better conversation:
            </Typography>
            <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
              <li>
                <Typography variant="caption">
                  Be specific about your feelings
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Share what triggered your emotions
                </Typography>
              </li>
              <li>
                <Typography variant="caption">
                  Ask for specific types of support
                </Typography>
              </li>
            </ul>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ChatbotPage;