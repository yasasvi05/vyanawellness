export const gentleResponses = {
  greeting: [
    "Hi there. I'm here whenever you're ready to talk.",
    "Welcome back. Take your time, there's no rush.",
    "Hello. It's good to see you today.",
    "I'm here to listen, whenever you feel like sharing."
  ],
  
  comfort: [
    "It's completely okay to feel this way.",
    "Your feelings are valid, and you're not alone.",
    "Take a gentle breath. We can go at your pace.",
    "However you're feeling right now is perfectly okay."
  ],
  
  encouragement: [
    "You're doing better than you think you are.",
    "Small steps are still steps forward.",
    "Be kind to yourself today.",
    "You're stronger than you feel right now."
  ],
  
  support: [
    "I'm here with you through this.",
    "Let's take this one breath at a time.",
    "You don't have to face this alone.",
    "I'm listening, and I care about what you're going through."
  ]
};

export const getGentleResponse = (category = 'comfort') => {
  const responses = gentleResponses[category] || gentleResponses.comfort;
  return responses[Math.floor(Math.random() * responses.length)];
};

export const emotionToColor = {
  happy: '#88c0a1', // Sage green
  neutral: '#c8a8e9', // Lavender
  sad: '#a8d5ba', // Light sage
  anxious: '#f5c181', // Warm peach
  angry: '#e8a5a5', // Soft pink-red
};

export const emotionToIcon = {
  happy: '😊',
  neutral: '🙂',
  sad: '💙',
  anxious: '🫂',
  angry: '💝',
};

export const emotionToDescription = {
  happy: "I'm glad you're feeling peaceful",
  neutral: "Thank you for sharing where you are",
  sad: "It's okay to feel this way sometimes",
  anxious: "I'm here with you through this",
  angry: "Your feelings matter and are valid"
};