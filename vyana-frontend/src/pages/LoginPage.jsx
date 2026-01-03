import React, { useState } from 'react';
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
  CircularProgress
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: ''
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (activeTab === 1) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    let result;
    
    if (activeTab === 0) {
      result = await login(formData.email, formData.password);
    } else {
      result = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
    }
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={10} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <PsychologyIcon 
            sx={{ 
              fontSize: 60, 
              color: '#6366f1',
              mb: 2 
            }} 
          />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#333' }}>
            Welcome to VYANA
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your mental wellness companion
          </Typography>
        </Box>

        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered
          sx={{ mb: 3 }}
        >
          <Tab 
            icon={<LockOutlinedIcon />} 
            iconPosition="start" 
            label="Login" 
            sx={{ fontWeight: 600 }}
          />
          <Tab 
            icon={<PersonAddOutlinedIcon />} 
            iconPosition="start" 
            label="Sign Up" 
            sx={{ fontWeight: 600 }}
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
              variant="outlined"
              disabled={loading}
            />
          )}

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            variant="outlined"
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
            variant="outlined"
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
              variant="outlined"
              disabled={loading}
            />
          )}

          {activeTab === 0 && (
            <Box sx={{ textAlign: 'right', mt: 1, mb: 2 }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#6366f1' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              bgcolor: '#6366f1',
              '&:hover': { bgcolor: '#4f46e5' },
              borderRadius: 2,
              fontWeight: 600
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeTab === 0 ? 'Sign In' : 'Create Account'}
          </Button>

          {activeTab === 0 && (
            <Typography variant="body2" align="center" sx={{ mt: 2, color: '#666' }}>
              Don't have an account?{' '}
              <Link 
                to="#" 
                onClick={() => setActiveTab(1)} 
                style={{ textDecoration: 'none', color: '#6366f1', fontWeight: 600 }}
              >
                Sign up here
              </Link>
            </Typography>
          )}
        </form>

        <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
          <Typography variant="body2">
            Demo credentials: Use any email and password (min 6 chars) to login
          </Typography>
        </Alert>
      </Paper>
    </Container>
  );
};

export default LoginPage;