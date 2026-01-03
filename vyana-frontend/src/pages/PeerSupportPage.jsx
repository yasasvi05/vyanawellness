import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  TextField,
  IconButton,
  Paper,
  Divider,
  Badge,
} from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import { motion, AnimatePresence } from 'framer-motion';

const PeerSupportPage = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [rooms, setRooms] = useState([
    {
      id: 1,
      title: 'Exam Stress Support',
      description: 'For students dealing with exam pressure and academic anxiety',
      topic: 'Academic',
      members: 24,
      isPrivate: false,
      online: 8,
      messages: [
        { id: 1, text: "Anyone else feeling overwhelmed with finals?", sender: "User_123", time: "10:30 AM" },
        { id: 2, text: "Yes! I have 3 exams next week 😓", sender: "Anonymous", time: "10:32 AM" },
        { id: 3, text: "Remember to take breaks and stay hydrated!", sender: "CalmMind", time: "10:35 AM" },
      ],
    },
    {
      id: 2,
      title: 'Overthinking Anonymous',
      description: 'Share thoughts and get support for racing thoughts',
      topic: 'Anxiety',
      members: 42,
      isPrivate: true,
      online: 15,
      messages: [
        { id: 1, text: "I keep replaying conversations in my head", sender: "Thinker", time: "9:15 AM" },
        { id: 2, text: "That's totally normal! Mindfulness helps me", sender: "Peaceful", time: "9:20 AM" },
      ],
    },
    {
      id: 3,
      title: 'Loneliness Support',
      description: 'Connect with others who understand feeling alone',
      topic: 'Social',
      members: 36,
      isPrivate: false,
      online: 12,
      messages: [
        { id: 1, text: "It's been hard making friends lately", sender: "AloneHeart", time: "11:00 AM" },
        { id: 2, text: "You're not alone in feeling alone ❤️", sender: "FriendHere", time: "11:05 AM" },
      ],
    },
    {
      id: 4,
      title: 'Work Burnout',
      description: 'For professionals dealing with workplace stress',
      topic: 'Career',
      members: 31,
      isPrivate: false,
      online: 6,
      messages: [],
    },
    {
      id: 5,
      title: 'Sleep Issues',
      description: 'Share experiences and tips for better sleep',
      topic: 'Health',
      members: 28,
      isPrivate: true,
      online: 4,
      messages: [],
    },
    {
      id: 6,
      title: 'Relationship Stress',
      description: 'Support for relationship challenges',
      topic: 'Relationships',
      members: 19,
      isPrivate: true,
      online: 3,
      messages: [],
    },
  ]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (activeRoom) {
      const room = rooms.find(r => r.id === activeRoom);
      setMessages(room?.messages || []);
    }
  }, [activeRoom, rooms]);

  const handleJoinRoom = (roomId) => {
    setActiveRoom(roomId);
  };

  const handleSendMessage = () => {
    if (!message.trim() || !activeRoom) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedRooms = rooms.map(room => {
      if (room.id === activeRoom) {
        return {
          ...room,
          messages: [...room.messages, newMessage],
        };
      }
      return room;
    });

    setRooms(updatedRooms);
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const topicColors = {
    'Academic': '#3b82f6',
    'Anxiety': '#8b5cf6',
    'Social': '#10b981',
    'Career': '#f59e0b',
    'Health': '#ef4444',
    'Relationships': '#ec4899',
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupsIcon sx={{ color: '#6366f1' }} /> Anonymous Peer Support
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with others in safe, moderated spaces. All chats are anonymous and confidential.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Room List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Available Rooms ({rooms.length})
          </Typography>
          
          <Grid container spacing={2}>
            {rooms.map((room) => (
              <Grid item xs={12} key={room.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card 
                    onClick={() => handleJoinRoom(room.id)}
                    sx={{
                      cursor: 'pointer',
                      border: activeRoom === room.id ? '2px solid #6366f1' : '1px solid #e5e7eb',
                      bgcolor: activeRoom === room.id ? '#f5f3ff' : 'white',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: '#6366f1',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {room.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {room.isPrivate ? (
                            <LockIcon fontSize="small" color="action" />
                          ) : (
                            <PublicIcon fontSize="small" color="action" />
                          )}
                          <Badge
                            color="success"
                            variant="dot"
                            invisible={room.online === 0}
                          >
                            <Typography variant="caption" color="text.secondary">
                              {room.online} online
                            </Typography>
                          </Badge>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {room.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={room.topic}
                          size="small"
                          sx={{
                            bgcolor: `${topicColors[room.topic]}15`,
                            color: topicColors[room.topic],
                            fontWeight: 500,
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 12 } }}>
                            {[...Array(Math.min(3, room.members))].map((_, i) => (
                              <Avatar key={i} sx={{ bgcolor: '#6366f1' }}>
                                <PersonIcon sx={{ fontSize: 14 }} />
                              </Avatar>
                            ))}
                          </AvatarGroup>
                          <Typography variant="caption" color="text.secondary">
                            {room.members} members
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column - Chat Room */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              height: 'calc(100vh - 200px)', 
              display: 'flex', 
              flexDirection: 'column',
              border: '1px solid #e5e7eb',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            {activeRoom ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #e5e7eb', bgcolor: '#f8fafc' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {rooms.find(r => r.id === activeRoom)?.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {rooms.find(r => r.id === activeRoom)?.description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        label={rooms.find(r => r.id === activeRoom)?.topic}
                        size="small"
                        sx={{
                          bgcolor: `${topicColors[rooms.find(r => r.id === activeRoom)?.topic]}15`,
                          color: topicColors[rooms.find(r => r.id === activeRoom)?.topic],
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {rooms.find(r => r.id === activeRoom)?.online} online now
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Messages Area */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#fafafa' }}>
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: msg.sender === 'You' ? 'row-reverse' : 'row',
                            gap: 1,
                            mb: 0.5,
                          }}>
                            <Avatar sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: msg.sender === 'You' ? '#6366f1' : '#8b5cf6',
                              fontSize: 14,
                            }}>
                              {msg.sender === 'You' ? 'Y' : msg.sender.charAt(0)}
                            </Avatar>
                            <Box sx={{ 
                              maxWidth: '70%',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: msg.sender === 'You' ? 'flex-end' : 'flex-start',
                            }}>
                              <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
                                {msg.sender} • {msg.time}
                              </Typography>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 1.5,
                                  bgcolor: msg.sender === 'You' ? '#6366f1' : 'white',
                                  color: msg.sender === 'You' ? 'white' : 'inherit',
                                  borderRadius: msg.sender === 'You' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                                  border: msg.sender === 'You' ? 'none' : '1px solid #e5e7eb',
                                }}
                              >
                                <Typography variant="body2">{msg.text}</Typography>
                              </Paper>
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      placeholder="Type your message (anonymous)..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                      variant="outlined"
                      size="small"
                    />
                    <IconButton
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
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
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    ⚠️ Remember: Be respectful. All messages are anonymous but moderated.
                  </Typography>
                </Box>
              </>
            ) : (
              /* Empty State */
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                p: 4,
              }}>
                <GroupsIcon sx={{ fontSize: 80, color: '#e5e7eb', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Select a support room to start chatting
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Choose from the available rooms on the left to connect with others who understand
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PeerSupportPage;