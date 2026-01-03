import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const AdminPage = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Mock data
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: <PeopleIcon />, color: '#6366f1' },
    { label: 'Active Today', value: '348', change: '+8%', icon: <TrendingUpIcon />, color: '#10b981' },
    { label: 'SOS Alerts', value: '12', change: '-3%', icon: <WarningIcon />, color: '#ef4444' },
    { label: 'Avg. Mood', value: '3.8', change: '+0.2', icon: <ChatIcon />, color: '#f59e0b' },
  ];

  const moodData = [
    { name: 'Happy', value: 35, color: '#10b981' },
    { name: 'Neutral', value: 25, color: '#f59e0b' },
    { name: 'Anxious', value: 20, color: '#8b5cf6' },
    { name: 'Sad', value: 15, color: '#3b82f6' },
    { name: 'Angry', value: 5, color: '#ef4444' },
  ];

  const dailyActivity = [
    { day: 'Mon', checkins: 120, chats: 89 },
    { day: 'Tue', checkins: 145, chats: 102 },
    { day: 'Wed', checkins: 134, chats: 95 },
    { day: 'Thu', checkins: 167, chats: 120 },
    { day: 'Fri', checkins: 189, chats: 145 },
    { day: 'Sat', checkins: 156, chats: 110 },
    { day: 'Sun', checkins: 98, chats: 76 },
  ];

  const sosAlerts = [
    { id: 1, user: 'User_123', type: 'Multiple Negative Entries', time: '2 hours ago', status: 'Pending' },
    { id: 2, user: 'User_456', type: 'High Risk Keywords', time: '5 hours ago', status: 'Resolved' },
    { id: 3, user: 'User_789', type: 'Prolonged Inactivity', time: '1 day ago', status: 'In Progress' },
    { id: 4, user: 'User_101', type: 'Multiple Negative Entries', time: '2 days ago', status: 'Resolved' },
  ];

  const recentRooms = [
    { name: 'Exam Stress Support', active: 24, messages: 156, created: '2 days ago' },
    { name: 'Overthinking Anonymous', active: 18, messages: 89, created: '3 days ago' },
    { name: 'Loneliness Support', active: 12, messages: 67, created: '1 week ago' },
    { name: 'Work Burnout', active: 8, messages: 45, created: '2 weeks ago' },
  ];

  const handleViewAlert = (alert) => {
    setSelectedAlert(alert);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAlert(null);
  };

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Card sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 80, color: '#ef4444', mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Access Denied
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You need administrator privileges to access this page.
          </Typography>
          <Button variant="contained" href="/dashboard">
            Return to Dashboard
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AdminPanelSettingsIcon sx={{ color: '#6366f1' }} /> Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Platform analytics, user management, and safety monitoring
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                  {stat.change} from last week
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Left Column - Charts */}
        <Grid item xs={12} lg={8}>
          {/* Mood Distribution */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Mood Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {moodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Daily Activity */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Daily Activity Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="checkins" fill="#6366f1" name="Daily Check-ins" />
                    <Bar dataKey="chats" fill="#8b5cf6" name="AI Chats" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Alerts & Rooms */}
        <Grid item xs={12} lg={4}>
          {/* SOS Alerts */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent SOS Alerts
                </Typography>
                <Chip label={sosAlerts.length} size="small" color="error" />
              </Box>
              
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sosAlerts.map((alert) => (
                      <TableRow key={alert.id} hover>
                        <TableCell>{alert.user}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>
                          <Chip 
                            label={alert.status} 
                            size="small"
                            sx={{
                              bgcolor: alert.status === 'Resolved' ? '#d1fae5' : 
                                      alert.status === 'In Progress' ? '#fef3c7' : '#fee2e2',
                              color: alert.status === 'Resolved' ? '#065f46' : 
                                    alert.status === 'In Progress' ? '#92400e' : '#991b1b',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleViewAlert(alert)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Active Support Rooms */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Active Support Rooms
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentRooms.map((room, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {room.name}
                      </Typography>
                      <Chip label={`${room.active} active`} size="small" color="success" variant="outlined" />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {room.messages} messages • Created {room.created}
                      </Typography>
                      <IconButton size="small">
                        <BlockIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alert Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAlert && (
          <>
            <DialogTitle sx={{ borderBottom: '1px solid #e5e7eb' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WarningIcon color="error" />
                <Typography variant="h6">SOS Alert Details</Typography>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ pt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">User ID</Typography>
                  <Typography variant="body1">{selectedAlert.user}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Alert Type</Typography>
                  <Typography variant="body1">{selectedAlert.type}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Time</Typography>
                  <Typography variant="body1">{selectedAlert.time}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                  <Chip 
                    label={selectedAlert.status} 
                    size="small"
                    sx={{
                      bgcolor: selectedAlert.status === 'Resolved' ? '#d1fae5' : 
                              selectedAlert.status === 'In Progress' ? '#fef3c7' : '#fee2e2',
                      color: selectedAlert.status === 'Resolved' ? '#065f46' : 
                            selectedAlert.status === 'In Progress' ? '#92400e' : '#991b1b',
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Context</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    defaultValue="User has been expressing negative emotions consistently over the past 24 hours. Detected keywords: 'overwhelmed', 'hopeless', 'can't go on'. Pattern indicates potential risk."
                    sx={{ mt: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">Recommended Action</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    defaultValue="1. Send a check-in message\n2. Notify platform counselor\n3. Monitor activity for next 24 hours"
                    sx={{ mt: 1 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, borderTop: '1px solid #e5e7eb' }}>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="error">Mark as Critical</Button>
              <Button variant="contained">Resolve Alert</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default AdminPage;