export const colors = {
  // Primary VYANA calming greens
  primaryGreen: '#4A7C59',
  deepGreen: '#2E5C3E',
  softGreen: '#7C9885',
  lightGreen: '#A5D6A7',

  // Neutrals
  cloudWhite: '#FFFFFF',
  softGray: '#F1F8F4',
  subtleGray: '#E0EFE6',
  gentleCharcoal: '#2E5C3E',

  // Accents (very sparing)
  hopefulGreen: '#81C784',
  warmSand: '#F4EDE4',
  sunlightYellow: '#FFD166',

  // Emotion colors (non-aggressive)
  happy: '#FFD166',
  sad: '#7C9885',
  anxious: '#A5D6A7',
  angry: '#C05656',
  neutral: '#C8E6C9',

  // States
  success: '#4A7C59',
  warning: '#E6B566',
  error: '#C05656',
  info: '#7C9885',
};

export const gradients = {
  background:
    'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)',

  card:
    'linear-gradient(145deg, #FFFFFF 0%, #F1F8F4 100%)',

  soothing:
    'linear-gradient(135deg, #7C9885 0%, #4A7C59 100%)',

  dawn:
    'linear-gradient(135deg, #F1F8F4 0%, #E8F5E9 100%)',
};

export const shadows = {
  soft: '0 8px 32px rgba(74, 124, 89, 0.12)',
  softer: '0 4px 20px rgba(74, 124, 89, 0.08)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
};

export const animations = {
  gentle: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.5s ease',
  bounce: 'all 0.25s ease-out',
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
