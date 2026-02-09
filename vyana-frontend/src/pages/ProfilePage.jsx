import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PsychologyIcon from "@mui/icons-material/Psychology";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/AuthContext";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    bio: "Mental wellness enthusiast. Taking it one day at a time.",
    phone: "+1 (555) 123-4567",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    moodReminders: true,
    communityUpdates: false,
    promotional: false,
  });

  const [sosSettings, setSosSettings] = useState({
    autoDetect: true,
    notifyContact: true,
    contactName: "Emergency Contact",
    contactPhone: "+1 (555) 987-6543",
  });

  const moodHistory = [
    { date: "Today", mood: "Neutral", activity: "Daily check-in" },
    { date: "Yesterday", mood: "Happy", activity: "Chat with AI" },
    { date: "Nov 28", mood: "Anxious", activity: "Joined support room" },
    { date: "Nov 27", mood: "Sad", activity: "Journal entry" },
    { date: "Nov 26", mood: "Happy", activity: "Completed exercise" },
  ];

  const handleSaveProfile = () => {
    setEditMode(false);
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
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 300,
              fontFamily: '"Playfair Display", serif',
              color: "#2e5c3e",
            }}
          >
            Your Profile
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            Manage your personal space and safety preferences
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            {/* Profile Card */}
            <Card sx={{ ...glassCard, mb: 3 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "#4a7c59",
                    fontSize: 48,
                    mb: 3,
                    mx: "auto",
                  }}
                >
                  {profileData.name.charAt(0)}
                </Avatar>

                <Typography variant="h5" sx={{ color: "#2e5c3e" }}>
                  {profileData.name}
                </Typography>

                <Chip
                  label="Active Member"
                  size="small"
                  sx={{
                    bgcolor: "#d1fae5",
                    color: "#065f46",
                    mt: 1,
                    mb: 2,
                  }}
                />

                <Typography sx={{ color: "#5a8a6a", mb: 3 }} variant="body2">
                  {profileData.bio}
                </Typography>

                <Box sx={{ textAlign: "left" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body2">{profileData.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PersonIcon fontSize="small" />
                    <Typography variant="body2">Member since Jan 2024</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PsychologyIcon fontSize="small" />
                    <Typography variant="body2">24 check-ins completed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Mood History */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#2e5c3e", mb: 2 }}>
                  Recent Mood History
                </Typography>
                <List dense>
                  {moodHistory.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CalendarTodayIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.date}
                        secondary={item.activity}
                      />
                      <Chip label={item.mood} size="small" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            {/* Personal Info */}
            <Card sx={{ ...glassCard, mb: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" sx={{ color: "#2e5c3e" }}>
                    Personal Information
                  </Typography>
                  {!editMode ? (
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(true)}
                      sx={{ color: "#4a7c59", borderColor: "#4a7c59" }}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleSaveProfile}
                      sx={{ bgcolor: "#4a7c59" }}
                    >
                      Save
                    </Button>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.name}
                      disabled={!editMode}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" value={profileData.email} disabled />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={3}
                      value={profileData.bio}
                      disabled={!editMode}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card sx={{ ...glassCard, mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: "#2e5c3e", mb: 2, display: "flex", gap: 1 }}
                >
                  <NotificationsIcon /> Notifications
                </Typography>

                {Object.entries(notifications).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Switch
                        checked={value}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [key]: e.target.checked })
                        }
                      />
                    }
                    label={key.replace(/([A-Z])/g, " $1")}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Safety */}
            <Card sx={{ ...glassCard, mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: "#2e5c3e", mb: 2, display: "flex", gap: 1 }}
                >
                  <SecurityIcon /> Safety & SOS
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={sosSettings.autoDetect}
                      onChange={(e) =>
                        setSosSettings({ ...sosSettings, autoDetect: e.target.checked })
                      }
                    />
                  }
                  label="Auto-detect distress signals"
                />

                <Divider sx={{ my: 2 }} />

                <TextField
                  fullWidth
                  label="Emergency Contact Name"
                  value={sosSettings.contactName}
                  onChange={(e) =>
                    setSosSettings({ ...sosSettings, contactName: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Emergency Contact Phone"
                  value={sosSettings.contactPhone}
                  onChange={(e) =>
                    setSosSettings({ ...sosSettings, contactPhone: e.target.value })
                  }
                />
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card sx={glassCard}>
              <CardContent>
                <Typography variant="h5" sx={{ color: "#2e5c3e", mb: 2 }}>
                  Account Actions
                </Typography>

                <Button fullWidth variant="outlined" onClick={logout} sx={{ mb: 1 }}>
                  Sign Out
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  sx={{ color: "#c05656", borderColor: "#c05656" }}
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfilePage;
