import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import PeerSupportPage from './pages/PeerSupportPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

// Components
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';

// Theme
const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#4A7C59',   // VYANA primary green
      light: '#7C9885',
      dark: '#2E5C3E',
      contrastText: '#FFFFFF',
    },

    secondary: {
      main: '#A5D6A7',   // soft supportive green
      light: '#C8E6C9',
      dark: '#7CB342',
    },

    success: {
      main: '#4A7C59',
    },

    warning: {
      main: '#E6B566',
    },

    error: {
      main: '#C05656',
    },

    info: {
      main: '#7C9885',
    },

    background: {
      default: '#E8F5E9',
      paper: '#FFFFFF',
    },

    text: {
      primary: '#2E5C3E',
      secondary: '#5A8A6A',
    },
  },

  typography: {
    fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2E5C3E',
          boxShadow: '0 4px 20px rgba(74, 124, 89, 0.12)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 20,
        },
        containedPrimary: {
          boxShadow: '0 8px 24px rgba(74, 124, 89, 0.25)',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background:
            'linear-gradient(145deg, #FFFFFF 0%, #F1F8F4 100%)',
          boxShadow: '0 8px 32px rgba(74, 124, 89, 0.12)',
          borderRadius: 20,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&.Mui-selected': {
            color: '#4A7C59',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '10px',
                },
              }}
            />
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<LoginPage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/chat" element={<ChatbotPage />} />
                <Route path="/peer-support" element={<PeerSupportPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;