import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Container,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAuth } from '../../contexts/AuthContext';

const PRIMARY = '#4A7C59';
const PRIMARY_LIGHT = 'rgba(74, 124, 89, 0.12)';
const TEXT_MUTED = '#5A8A6A';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/chat', label: 'AI Chat', icon: <ChatBubbleIcon /> },
    { path: '/peer-support', label: 'Support', icon: <GroupsIcon /> },
    { path: '/activities', label: 'Activities', icon: <PsychologyIcon /> },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(74,124,89,0.15)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <PsychologyIcon sx={{ color: PRIMARY, fontSize: 32, mr: 1 }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: PRIMARY,
                textDecoration: 'none',
              }}
            >
              VYANA
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive(item.path) ? PRIMARY : TEXT_MUTED,
                  bgcolor: isActive(item.path) ? PRIMARY_LIGHT : 'transparent',
                  borderRadius: 999,
                  px: 2,
                  fontWeight: isActive(item.path) ? 600 : 500,
                  '&:hover': {
                    bgcolor: PRIMARY_LIGHT,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Section */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar sx={{ bgcolor: PRIMARY }}>
                  {user.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                {user.role === 'admin' && (
                  <MenuItem component={Link} to="/admin">Admin Dashboard</MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile */}
          <IconButton
            sx={{ display: { md: 'none' } }}
            onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={() => setMobileMenuAnchor(null)}
          >
            {navItems.map((item) => (
              <MenuItem
                key={item.path}
                component={Link}
                to={item.path}
                sx={{ color: isActive(item.path) ? PRIMARY : TEXT_MUTED }}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
