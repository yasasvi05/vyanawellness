import React, { useState } from 'react';
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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User',
    email: user?.email || 'user@example.com',
    bio: 'Mental wellness enthusiast. Taking it one day at a time.',
    phone: '+1 (555) 123-4567',
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
    contactName: 'Emergency Contact',
    contactPhone: '+1 (555) 987-6543',
  });

  const moodHistory = [
    { date: 'Today', mood: 'Neutral', activity: 'Daily check-in' },
    { date: 'Yesterday', mood: 'Happy', activity: 'Chat with AI' },
    { date: 'Nov 28', mood: 'Anxious', activity: 'Joined support room' },
    { date: 'Nov 27', mood: 'Sad', activity: 'Journal entry' },
    { date: 'Nov 26', mood: 'Happy', activity: 'Completed exercise' },
  ];

  const handleSaveProfile = () => {
    // In real app, would call API here
    setEditMode(false);
  };

  const handleNotificationChange = (key) => (event) => {
    setNotifications({
      ...notifications,
      [key]: event.target.checked,
    });
  };

  const handleSosChange = (key) => (event) => {
    setSosSettings({
      ...sosSettings,
      [key]: event.target.checked,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Your Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account settings and view your wellness journey
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#6366f1',
                    fontSize: 48,
                    mb: 3,
                    mx: 'auto',
                  }}
                >
                  {profileData.name?.charAt(0).toUpperCase()}
                </Avatar>
                
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {profileData.name}
                </Typography>
                
                <Chip
                  label="Active Member"
                  size="small"
                  sx={{ bgcolor: '#d1fae5', color: '#065f46', mb: 2 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {profileData.bio}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">{profileData.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">Member since Jan 2024</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PsychologyIcon sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="body2">24 check-ins completed</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Mood History */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Recent Mood History
                </Typography>
                <List dense>
                  {moodHistory.map((item, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, color: '#666' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.date}
                        secondary={item.activity}
                      />
                      <Chip
                        label={item.mood}
                        size="small"
                        sx={{
                          bgcolor: item.mood === 'Happy' ? '#d1fae5' : 
                                  item.mood === 'Sad' ? '#dbeafe' :
                                  item.mood === 'Anxious' ? '#f5f3ff' : '#fef3c7',
                          color: item.mood === 'Happy' ? '#065f46' : 
                                item.mood === 'Sad' ? '#1e40af' :
                                item.mood === 'Anxious' ? '#5b21b6' : '#92400e',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Column - Settings */}
        <Grid item xs={12} md={8}>
          {/* Edit Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Personal Information
                  </Typography>
                  {!editMode ? (
                    <Button
                      variant="outlined"
                      onClick={() => setEditMode(true)}
                      sx={{ borderColor: '#6366f1', color: '#6366f1' }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setEditMode(false)}
                        sx={{ borderColor: '#666', color: '#666' }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleSaveProfile}
                        sx={{ bgcolor: '#6366f1' }}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  )}
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!editMode}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={profileData.email}
                      disabled
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editMode}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!editMode}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsIcon /> Notification Settings
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.emailAlerts}
                        onChange={handleNotificationChange('emailAlerts')}
                        color="primary"
                      />
                    }
                    label="Email alerts for important updates"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.moodReminders}
                        onChange={handleNotificationChange('moodReminders')}
                        color="primary"
                      />
                    }
                    label="Daily mood check-in reminders"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.communityUpdates}
                        onChange={handleNotificationChange('communityUpdates')}
                        color="primary"
                      />
                    }
                    label="Community and peer support updates"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.promotional}
                        onChange={handleNotificationChange('promotional')}
                        color="primary"
                      />
                    }
                    label="Promotional emails and offers"
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Safety & SOS Settings */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon /> Safety & SOS Settings
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sosSettings.autoDetect}
                        onChange={handleSosChange('autoDetect')}
                        color="primary"
                      />
                    }
                    label="Auto-detect distress signals from chat"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sosSettings.notifyContact}
                        onChange={handleSosChange('notifyContact')}
                        color="primary"
                      />
                    }
                    label="Notify emergency contact in critical situations"
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Emergency Contact
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Contact Name"
                      value={sosSettings.contactName}
                      onChange={(e) => setSosSettings({ ...sosSettings, contactName: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      value={sosSettings.contactPhone}
                      onChange={(e) => setSosSettings({ ...sosSettings, contactPhone: e.target.value })}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
                
                <Typography variant="caption" color="text.secondary">
                  ⚠️ This contact will only be notified in extreme situations where your safety may be at risk.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Account Actions
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={logout}
                    sx={{ justifyContent: 'flex-start', color: '#666', borderColor: '#e5e7eb' }}
                  >
                    Sign Out
                  </Button>
                  
                  <Button
                    variant="outlined"
                    sx={{ justifyContent: 'flex-start', color: '#666', borderColor: '#e5e7eb' }}
                  >
                    Export My Data
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    sx={{ justifyContent: 'flex-start', color: '#ef4444', borderColor: '#ef4444' }}
                  >
                    Delete Account
                  </Button>
                </Box>
                
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                  Deleting your account will permanently remove all your data from our systems.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;