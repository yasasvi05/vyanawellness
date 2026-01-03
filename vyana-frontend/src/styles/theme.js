export const colors = {
  // Primary calming palette
  calmBlue: '#6C9BCF',
  sereneTeal: '#4ECDC4',
  mistyBlue: '#A8D0E6',
  softLavender: '#B19CD9',
  
  // Neutrals
  cloudWhite: '#FFFFFF',
  softGray: '#F7F9FC',
  gentleCharcoal: '#2C3E50',
  subtleGray: '#E8EEF4',
  
  // Accents (use sparingly)
  hopefulGreen: '#77DD77',
  warmCoral: '#FF9AA2',
  sunlightYellow: '#FFD166',
  
  // Emotion colors
  happy: '#FFD166',
  sad: '#6C9BCF',
  anxious: '#EFB7BA',
  angry: '#FF9AA2',
  neutral: '#A8D0E6',
  
  // States
  success: '#4ECDC4',
  warning: '#FFB74D',
  error: '#FF9AA2',
  info: '#6C9BCF',
};

export const gradients = {
  background: 'linear-gradient(135deg, #F7F9FC 0%, #E3F2FD 100%)',
  card: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
  soothing: 'linear-gradient(135deg, #6C9BCF 0%, #4ECDC4 100%)',
  sunset: 'linear-gradient(135deg, #FFE8D6 0%, #F7CAC9 50%, #A8D0E6 100%)',
  dawn: 'linear-gradient(135deg, #FFE8D6 0%, #F7CAC9 100%)',
};

export const shadows = {
  soft: '0 8px 32px rgba(108, 155, 207, 0.08)',
  softer: '0 4px 20px rgba(108, 155, 207, 0.05)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
};

export const animations = {
  gentle: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s ease',
  bounce: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const theme = {
  colors,
  gradients,
  shadows,
  animations,
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
};