// Configuração da API
// FORÇA URL CORRETA - SEMPRE 127.0.0.1:8000
export const API_CONFIG = {
  // URL base da API - FORÇADA para 127.0.0.1:8000
  BASE_URL: 'http://127.0.0.1:8000',
  
  // Endpoints
  ENDPOINTS: {
    UPLOAD_PHOTO: '/photos/upload',
    GENERATE_PHOTOS: '/generate'
  },
  
  // Flag para uso de mocks durante desenvolvimento
  USE_MOCKS: false // DESABILITADO - Usar API real
};

// Debug: log da configuração
console.log('=== API CONFIG CARREGADO ===');
console.log('API_CONFIG completo:', API_CONFIG);
console.log('BASE_URL FORÇADA:', API_CONFIG.BASE_URL);
console.log('USE_MOCKS:', API_CONFIG.USE_MOCKS);
console.log('ENDPOINTS:', API_CONFIG.ENDPOINTS);
console.log('=== FIM CONFIG ===');

// Função para obter a URL completa do endpoint
export const getApiUrl = (endpoint) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  console.log('=== GET API URL ===');
  console.log('Endpoint recebido:', endpoint);
  console.log('BASE_URL:', API_CONFIG.BASE_URL);
  console.log('URL completa gerada:', fullUrl);
  console.log('=== FIM GET API URL ===');
  return fullUrl;
};
