import React, { useState } from "react";
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
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WarningIcon from "@mui/icons-material/Warning";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const AdminPage = () => {
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  /* ---------------- MOCK DATA ---------------- */

  const stats = [
    { label: "Total Users", value: "1,234" },
    { label: "Active Today", value: "348" },
    { label: "SOS Alerts", value: "12" },
    { label: "Avg Mood", value: "3.8 / 5" },
  ];

  const moodData = [
    { name: "Happy", value: 35, color: "#4a7c59" },
    { name: "Neutral", value: 25, color: "#7c9885" },
    { name: "Anxious", value: 20, color: "#8fa89e" },
    { name: "Sad", value: 15, color: "#5a8a6a" },
    { name: "Angry", value: 5, color: "#c05656" },
  ];

  const dailyActivity = [
    { day: "Mon", checkins: 120, chats: 89 },
    { day: "Tue", checkins: 145, chats: 102 },
    { day: "Wed", checkins: 134, chats: 95 },
    { day: "Thu", checkins: 167, chats: 120 },
    { day: "Fri", checkins: 189, chats: 145 },
    { day: "Sat", checkins: 156, chats: 110 },
    { day: "Sun", checkins: 98, chats: 76 },
  ];

  const sosAlerts = [
    { id: 1, user: "User_123", type: "Negative Entries", time: "2 hrs ago", status: "Pending" },
    { id: 2, user: "User_456", type: "High Risk Words", time: "5 hrs ago", status: "Resolved" },
    { id: 3, user: "User_789", type: "Inactivity", time: "1 day ago", status: "In Progress" },
  ];

  const rooms = [
    { name: "Exam Stress", active: 24 },
    { name: "Overthinking", active: 18 },
    { name: "Loneliness", active: 12 },
  ];

  /* ---------------- ACCESS CONTROL ---------------- */

  if (user?.role !== "admin") {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ ...glassCard, textAlign: "center", p: 5 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 72, color: "#c05656" }} />
            <Typography sx={{ mt: 2, color: "#2e5c3e" }} variant="h5">
              Access Denied
            </Typography>
            <Typography sx={{ color: "#5a8a6a", my: 2 }}>
              Admin privileges required
            </Typography>
            <Button
              variant="contained"
              href="/dashboard"
              sx={{
                bgcolor: "rgba(78,124,89,0.9)",
                textTransform: "none",
              }}
            >
              Return to Dashboard
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  /* ---------------- MAIN PAGE ---------------- */

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
        <Box sx={{ mb: 6 }}>
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
            <AdminPanelSettingsIcon /> Admin Dashboard
          </Typography>
          <Typography sx={{ color: "#5a8a6a" }}>
            Platform insights & safety monitoring
          </Typography>
        </Box>

        {/* Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={glassCard}>
                <CardContent>
                  <Typography sx={{ fontSize: "2rem", color: "#2e5c3e" }}>
                    {s.value}
                  </Typography>
                  <Typography sx={{ color: "#5a8a6a" }}>
                    {s.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {/* Charts */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ ...glassCard, mb: 4 }}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }}>
                  Mood Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={moodData} dataKey="value" outerRadius={90}>
                        {moodData.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }}>
                  Daily Activity
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <BarChart data={dailyActivity}>
                      <CartesianGrid stroke="#e0e0e0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="checkins" fill="#4a7c59" />
                      <Bar dataKey="chats" fill="#7c9885" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Alerts & Rooms */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ ...glassCard, mb: 4 }}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }}>
                  SOS Alerts
                </Typography>

                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sosAlerts.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{a.user}</TableCell>
                          <TableCell>
                            <Chip size="small" label={a.status} />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                setSelectedAlert(a);
                                setOpenDialog(true);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            <Card sx={glassCard}>
              <CardContent>
                <Typography sx={{ color: "#2e5c3e", mb: 2 }}>
                  Support Rooms
                </Typography>
                {rooms.map((r, i) => (
                  <Paper key={i} variant="outlined" sx={{ p: 2, mb: 1 }}>
                    <Typography>{r.name}</Typography>
                    <Chip size="small" label={`${r.active} active`} />
                  </Paper>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          {selectedAlert && (
            <>
              <DialogTitle>
                <WarningIcon color="error" /> Alert Details
              </DialogTitle>
              <DialogContent>
                <Typography>User: {selectedAlert.user}</Typography>
                <Typography>Status: {selectedAlert.status}</Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ mt: 2 }}
                  defaultValue="User showing prolonged distress patterns."
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
                <Button variant="contained">Resolve</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminPage;
