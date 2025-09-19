// Configuração da API
export const API_CONFIG = {
  // URL base da API - será configurada conforme o ambiente
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  
  // Endpoints
  ENDPOINTS: {
    UPLOAD_PHOTO: '/photos/upload',
    GENERATE_PHOTOS: '/generate'
  }
};

// Função para obter a URL completa do endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
