// Configuração da API
// Em projetos Vite, as variáveis de ambiente são expostas via import.meta.env com prefixo VITE_
export const API_CONFIG = {
  // URL base da API - configure VITE_API_URL no .env
  BASE_URL: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:3000',
  
  // Endpoints
  ENDPOINTS: {
    UPLOAD_PHOTO: '/photos/upload',
    GENERATE_PHOTOS: '/generate'
  },
  
  // Flag para uso de mocks durante desenvolvimento
  USE_MOCKS: (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_MOCKS)
    ? String(import.meta.env.VITE_USE_MOCKS).toLowerCase() === 'true'
    : false
};

// Função para obter a URL completa do endpoint
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
