import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const glassCard = {
  bgcolor: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  borderRadius: 4,
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    if (activeTab === 1) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result =
      activeTab === 0
        ? await login(formData.email, formData.password)
        : await signup({
            email: formData.email,
            password: formData.password,
            name: formData.name,
          });

    if (result.success) navigate("/dashboard");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ ...glassCard, p: 5 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <PsychologyIcon sx={{ fontSize: 64, color: "#4a7c59", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 300,
                fontFamily: '"Playfair Display", serif',
                color: "#2e5c3e",
              }}
            >
              Welcome to VYANA
            </Typography>
            <Typography sx={{ color: "#5a8a6a" }}>
              A gentle space for your mental wellness
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
            <Tab
              icon={<LockOutlinedIcon />}
              iconPosition="start"
              label="Login"
              sx={{ textTransform: "none", fontWeight: 500 }}
            />
            <Tab
              icon={<PersonAddOutlinedIcon />}
              iconPosition="start"
              label="Sign Up"
              sx={{ textTransform: "none", fontWeight: 500 }}
            />
          </Tabs>

          <form onSubmit={handleSubmit}>
            {activeTab === 1 && (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                disabled={loading}
              />
            )}

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              disabled={loading}
            />

            {activeTab === 1 && (
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                disabled={loading}
              />
            )}

            {activeTab === 0 && (
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                  <Typography sx={{ color: "#4a7c59", fontSize: "0.9rem" }}>
                    Forgot password?
                  </Typography>
                </Link>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                bgcolor: "rgba(78,124,89,0.9)",
                color: "white",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { bgcolor: "rgba(78,124,89,1)" },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : activeTab === 0 ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {activeTab === 0 && (
            <Typography sx={{ textAlign: "center", mt: 3, color: "#5a8a6a" }}>
              Don’t have an account?{" "}
              <Link
                to="#"
                onClick={() => setActiveTab(1)}
                style={{ color: "#4a7c59", fontWeight: 500 }}
              >
                Sign up
              </Link>
            </Typography>
          )}

          <Alert severity="info" sx={{ mt: 4, borderRadius: 3 }}>
            Demo mode: Use any email and password (6+ characters)
          </Alert>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
