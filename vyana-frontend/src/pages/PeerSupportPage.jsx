import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  
  Chip,
  Avatar,
  AvatarGroup,
  TextField,
  IconButton,
  Paper,
  Badge,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import PublicIcon from "@mui/icons-material/Public";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import { motion, AnimatePresence } from "framer-motion";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const PeerSupportPage = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [rooms, setRooms] = useState([
    {
      id: 1,
      title: "Exam Stress Support",
      description: "For students dealing with exam pressure and academic anxiety",
      topic: "Academic",
      members: 24,
      isPrivate: false,
      online: 8,
      messages: [
        { id: 1, text: "Anyone else feeling overwhelmed with finals?", sender: "User_123", time: "10:30 AM" },
        { id: 2, text: "Yes! I have 3 exams next week 😓", sender: "Anonymous", time: "10:32 AM" },
      ],
    },
    {
      id: 2,
      title: "Overthinking Anonymous",
      description: "Support for racing and repetitive thoughts",
      topic: "Anxiety",
      members: 42,
      isPrivate: true,
      online: 15,
      messages: [
        { id: 1, text: "I keep replaying conversations in my head", sender: "Thinker", time: "9:15 AM" },
      ],
    },
    {
      id: 3,
      title: "Loneliness Support",
      description: "A space to feel heard and connected",
      topic: "Social",
      members: 36,
      isPrivate: false,
      online: 12,
      messages: [],
    },
  ]);

  useEffect(() => {
    if (activeRoom) {
      const room = rooms.find((r) => r.id === activeRoom);
      setMessages(room?.messages || []);
    }
  }, [activeRoom, rooms]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeRoom) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setRooms((prev) =>
      prev.map((room) =>
        room.id === activeRoom
          ? { ...room, messages: [...room.messages, newMessage] }
          : room
      )
    );

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  const topicColors = {
    Academic: "#4a7c59",
    Anxiety: "#7c9885",
    Social: "#5a8a6a",
    Career: "#8fa89e",
    Health: "#c05656",
    Relationships: "#a86a8f",
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
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              fontFamily: '"Playfair Display", serif',
              color: "#2e5c3e",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <GroupsIcon /> Peer Support Spaces
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            Anonymous, moderated spaces where you’re not alone
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Room List */}
          <Grid item xs={12} md={4}>
            <Typography sx={{ color: "#2e5c3e", mb: 2 }} variant="h6">
              Available Rooms
            </Typography>

            <Grid container spacing={2}>
              {rooms.map((room) => (
                <Grid item xs={12} key={room.id}>
                  <motion.div whileHover={{ y: -4 }}>
                    <Card
                      sx={{
                        ...glassCard,
                        cursor: "pointer",
                        border:
                          activeRoom === room.id
                            ? "2px solid rgba(78,124,89,0.6)"
                            : glassCard.border,
                      }}
                      onClick={() => setActiveRoom(room.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Typography sx={{ color: "#2e5c3e" }}>
                            {room.title}
                          </Typography>
                          {room.isPrivate ? <LockIcon /> : <PublicIcon />}
                        </Box>

                        <Typography sx={{ color: "#5a8a6a", mb: 2 }} variant="body2">
                          {room.description}
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Chip
                            label={room.topic}
                            size="small"
                            sx={{
                              bgcolor: `${topicColors[room.topic]}20`,
                              color: topicColors[room.topic],
                            }}
                          />

                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 24, height: 24 } }}>
                              {[...Array(Math.min(3, room.members))].map((_, i) => (
                                <Avatar key={i} sx={{ bgcolor: "#4a7c59" }}>
                                  <PersonIcon sx={{ fontSize: 14 }} />
                                </Avatar>
                              ))}
                            </AvatarGroup>
                            <Badge
                              color="success"
                              variant="dot"
                              invisible={room.online === 0}
                            >
                              <Typography variant="caption" sx={{ color: "#5a8a6a" }}>
                                {room.online} online
                              </Typography>
                            </Badge>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Chat Area */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ ...glassCard, height: "70vh", display: "flex", flexDirection: "column" }}>
              {activeRoom ? (
                <>
                  {/* Messages */}
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
                              justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
                              mb: 2,
                            }}
                          >
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                maxWidth: "70%",
                                bgcolor:
                                  msg.sender === "You"
                                    ? "rgba(78,124,89,0.9)"
                                    : "rgba(255,255,255,0.85)",
                                color: msg.sender === "You" ? "white" : "#2e5c3e",
                                borderRadius:
                                  msg.sender === "You"
                                    ? "16px 16px 4px 16px"
                                    : "16px 16px 16px 4px",
                              }}
                            >
                              <Typography variant="body2">{msg.text}</Typography>
                              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                                {msg.sender} • {msg.time}
                              </Typography>
                            </Paper>
                          </Box>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Box>

                  {/* Input */}
                  <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        fullWidth
                        multiline
                        maxRows={3}
                        placeholder="Type anonymously…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                      />
                      <IconButton
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        sx={{
                          bgcolor: "rgba(78,124,89,0.9)",
                          color: "white",
                          "&:hover": { bgcolor: "rgba(78,124,89,1)" },
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </Box>

                    <Typography variant="caption" sx={{ color: "#5a8a6a", mt: 1 }}>
                      Be kind. This space is moderated and supportive.
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 4,
                  }}
                >
                  <GroupsIcon sx={{ fontSize: 72, color: "#c8e6c9" }} />
                  <Typography sx={{ color: "#5a8a6a", mt: 2 }}>
                    Select a room to begin connecting
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PeerSupportPage;
