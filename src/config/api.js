// Configuração da API - Atualizada para Runway Backend
export const API_CONFIG = {
  // URL base da API
  BASE_URL: 'http://127.0.0.1:8000',

  // Endpoints do backend Runway
  ENDPOINTS: {
    UPLOAD_PHOTO: '/photos/upload',
    GENERATE_PHOTOS: '/ai/generate', // POST: { prompt, s3Url, aspect_ratio }
    GENERATE_UPLOAD: '/ai/generate-upload', // POST multipart: file, prompt, aspect_ratio
    PROGRESS: '/ai/progress' // GET: /{task_id}
  },

  // Flag para uso de mocks durante desenvolvimento
  USE_MOCKS: false // Usar API real do Runway
};

// Debug: log da configuração
console.log('=== API CONFIG RUNWAY CARREGADO ===');
console.log('BASE_URL:', API_CONFIG.BASE_URL);
console.log('USE_MOCKS:', API_CONFIG.USE_MOCKS);
console.log('ENDPOINTS:', API_CONFIG.ENDPOINTS);
console.log('=== FIM CONFIG ===');

/**
 * Função para obter a URL completa do endpoint
 * @param {string} endpoint - Caminho do endpoint (ex: '/ai/generate' ou '/ai/progress/123')
 * @returns {string} URL completa
 */
export const getApiUrl = (endpoint) => {
  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  console.log('=== GET API URL ===');
  console.log('Endpoint recebido:', endpoint);
  console.log('BASE_URL:', API_CONFIG.BASE_URL);
  console.log('URL completa gerada:', fullUrl);
  return fullUrl;
};