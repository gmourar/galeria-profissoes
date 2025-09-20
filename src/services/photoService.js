import { getApiUrl, API_CONFIG } from '../config/api';

/**
 * Converte uma imagem base64 para Blob
 * @param {string} base64String - String base64 da imagem
 * @param {string} mimeType - Tipo MIME da imagem (ex: 'image/jpeg')
 * @returns {Blob} - Blob da imagem
 */
export const base64ToBlob = (base64String, mimeType = 'image/jpeg') => {
  // Remove o prefixo data:image/jpeg;base64, se existir
  const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
  
  // Converte base64 para bytes
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

/**
 * Faz upload de uma foto para o servidor
 * @param {string} base64Photo - Foto em formato base64
 * @param {Function} onProgress - Callback para progresso do upload
 * @param {Function} onSuccess - Callback para sucesso
 * @param {Function} onError - Callback para erro
 */
/**
 * Faz upload de uma foto para o servidor. Aceita base64 ou Blob/File
 * @param {string|Blob|File} photoInput - Imagem em base64 ou Blob/File
 * @param {Function} onProgress
 * @param {Function} onSuccess
 * @param {Function} onError
 */
export const uploadPhoto = async (photoInput, onProgress, onSuccess, onError) => {
  try {
    // Normaliza para Blob
    let blob;
    if (typeof photoInput === 'string') {
      blob = base64ToBlob(photoInput);
    } else if (photoInput instanceof Blob) {
      blob = photoInput;
    } else {
      throw new Error('Formato de imagem não suportado para upload');
    }
    
    // Cria FormData
    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');
    
    // Debug: verifica se mocks estão habilitados
    console.log('=== UPLOAD PHOTO DEBUG ===');
    console.log('API_CONFIG.USE_MOCKS:', API_CONFIG.USE_MOCKS);
    console.log('API_CONFIG.BASE_URL:', API_CONFIG.BASE_URL);
    console.log('API_CONFIG.ENDPOINTS.UPLOAD_PHOTO:', API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    
    // Decide entre mock e API real
    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para desenvolvimento');
      // Mantém o comportamento simulado existente, suportando Blob ou base64
      return simulateUpload(photoInput, onProgress, onSuccess, onError);
    }
    
    // URL completa do endpoint
    const uploadUrl = getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    console.log('=== CONECTANDO NA API REAL ===');
    console.log('URL COMPLETA:', uploadUrl);
    console.log('BASE_URL:', API_CONFIG.BASE_URL);
    console.log('ENDPOINT:', API_CONFIG.ENDPOINTS.UPLOAD_PHOTO);
    
    // Configuração do fetch
    console.log('=== INICIANDO FETCH ===');
    console.log('URL FINAL:', uploadUrl);
    console.log('MÉTODO: POST');
    console.log('BODY: FormData com arquivo');
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });
    
    console.log('=== RESPOSTA RECEBIDA ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('OK:', response.ok);
    
    if (!response.ok) {
      throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Salva o nome da foto retornado pela API
    if (result.nome) {
      localStorage.setItem('uploadedPhotoName', result.nome);
    }
    
    if (onSuccess) {
      onSuccess(result);
    }
    
  } catch (error) {
    console.error('Erro no upload da foto:', error);
    if (onError) {
      onError(error);
    }
  }
};

/**
 * Simula upload para desenvolvimento (quando não há backend)
 * @param {string} base64Photo - Foto em formato base64
 * @param {Function} onProgress - Callback para progresso
 * @param {Function} onSuccess - Callback para sucesso
 * @param {Function} onError - Callback para erro
 */
export const simulateUpload = (photoInput, onProgress, onSuccess, onError) => {
  // Simula progresso do upload
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (onProgress) {
      onProgress(progress);
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      
      // Simula resposta de sucesso usando a foto real
      const photoName = `foto_${Date.now()}.jpg`;
      
      // Cria uma URL de preview da foto real para uso posterior
      let previewUrl;
      if (typeof photoInput === 'string') {
        previewUrl = photoInput; // data URL da foto capturada
      } else if (photoInput instanceof Blob) {
        previewUrl = URL.createObjectURL(photoInput);
      }
      
      const mockResponse = {
        id: Math.floor(Math.random() * 1000) + 1,
        nome: photoName,
        original_url: previewUrl, // Usa a foto real capturada
        ia_url: null,
        quantidade: 0,
        impressa: false
      };
      
      // Salva o nome da foto e a URL real para uso posterior
      localStorage.setItem('uploadedPhotoName', photoName);
      localStorage.setItem('uploadedPhotoUrl', previewUrl);
      
      if (onSuccess) {
        onSuccess(mockResponse);
      }
    }
  }, 200);
};

/**
 * Gera fotos usando IA baseado no prompt fornecido
 * @param {string} prompt - Prompt para geração da foto
 * @returns {Promise<Array>} - Array com as fotos geradas
 */
export const generatePhotos = async (prompt) => {
  try {
    // Se estiver com mocks ligados, retorna simulado direto
    if (API_CONFIG.USE_MOCKS) {
      return simulateGeneratedPhotos();
    }

    // URL da API de geração
    const generateUrl = getApiUrl(API_CONFIG.ENDPOINTS.GENERATE_PHOTOS);

    const response = await fetch(generateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Erro na geração: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    // Backends podem responder com { photos: [...] } ou outra chave; padroniza
    if (Array.isArray(result)) return result;
    return result.photos || result.data || [];
    
  } catch (error) {
    console.error('Erro ao gerar fotos:', error);
    // Em caso de erro, retorna fotos simuladas para desenvolvimento
    return simulateGeneratedPhotos();
  }
};

/**
 * Gera foto com IA usando prompt formatado com photoUrl e styleRef
 * @param {string} prompt - Prompt formatado com placeholders
 * @param {string} photoUrl - URL da foto original
 * @param {string} styleRef - URL da referência de estilo
 * @returns {Promise<Object>} - Resposta com task_id
 */
export const generatePhotoWithAI = async (prompt, photoUrl, styleRef) => {
  try {
    console.log('=== GENERATE PHOTO WITH AI INICIADO ===');
    console.log('Prompt original:', prompt);
    console.log('Photo URL:', photoUrl);
    console.log('Style Ref:', styleRef);
    console.log('API_CONFIG.USE_MOCKS:', API_CONFIG.USE_MOCKS);
    
    // Se estiver com mocks ligados, simula a resposta
    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para geração de IA');
      // Simula delay da IA
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTaskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      return { task_id: mockTaskId };
    }

    // Substitui os placeholders no prompt
    const formattedPrompt = prompt
      .replace('{photoUrl}', photoUrl)
      .replace('{styleRef}', styleRef);

    console.log('=== PROMPT FORMATADO ===');
    console.log('Prompt final:', formattedPrompt);

    // URL da API de geração
    const generateUrl = getApiUrl(API_CONFIG.ENDPOINTS.GENERATE_PHOTOS);
    
    console.log('=== FAZENDO POST PARA /generate ===');
    console.log('URL completa:', generateUrl);
    console.log('Método: POST');
    console.log('Headers: Content-Type: application/json');
    
    // Prepara o body
    const requestBody = { prompt: formattedPrompt };
    const bodyString = JSON.stringify(requestBody);
    
    console.log('=== BODY DA REQUISIÇÃO ===');
    console.log('Body JSON:', bodyString);
    console.log('Body objeto:', requestBody);
    console.log('Tamanho do body:', bodyString.length, 'caracteres');

    const response = await fetch(generateUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: bodyString
    });

    console.log('=== RESPOSTA DA API /generate ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('OK:', response.ok);

    if (!response.ok) {
      throw new Error(`Erro na geração: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Resultado da API:', result);
    return result;
    
  } catch (error) {
    console.error('❌ ERRO AO GERAR FOTO COM IA:', error);
    console.error('Detalhes do erro:', error.message);
    throw error;
  }
};

/**
 * Obtém a URL da referência de estilo baseada na profissão e gênero
 * @param {string} profession - Profissão selecionada
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @returns {string} - URL da imagem de referência
 */
export const getStyleReferenceUrl = (profession, gender) => {
  const genderCode = gender === 'masculino' ? 'MASC' : 'FEM';
  const professionFolder = profession.toUpperCase();
  
  // Para REAL_STATE, o nome da pasta é "REAL ESTATE"
  const folderName = professionFolder === 'REAL_STATE' ? 'REAL ESTATE' : professionFolder;
  
  return `/src/assets/${folderName}/${genderCode}.png`;
};

/**
 * Constrói a URL completa da foto original
 * @param {string} photoName - Nome da foto retornado pela API
 * @returns {string} - URL completa da foto
 */
export const buildPhotoUrl = (photoName) => {
  // Constrói URL real da API
  return `https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/${photoName}`;
};

/**
 * Verifica o progresso de uma tarefa de geração
 * @param {string} taskId - ID da tarefa
 * @returns {Promise<Object>} - Resposta com progresso e URLs das imagens
 */
export const checkProgress = async (taskId) => {
  try {
    console.log('=== CHECK PROGRESS INICIADO ===');
    console.log('Task ID:', taskId);
    console.log('API_CONFIG.USE_MOCKS:', API_CONFIG.USE_MOCKS);
    
    // Se estiver com mocks ligados, simula o progresso
    if (API_CONFIG.USE_MOCKS) {
      console.log('Usando mocks para verificação de progresso');
      
      // Simula progresso incremental
      const currentProgress = parseInt(localStorage.getItem('mockProgress') || '0');
      let newProgress = currentProgress + Math.floor(Math.random() * 20) + 10;
      
      if (newProgress > 100) newProgress = 100;
      
      localStorage.setItem('mockProgress', newProgress.toString());
      
      if (newProgress === 100) {
        // Simula URLs de imagens geradas baseadas na foto original
        const originalPhotoUrl = localStorage.getItem('uploadedPhotoUrl');
        
        // Se temos a foto original, cria variações simuladas
        if (originalPhotoUrl) {
          console.log('Gerando imagens baseadas na foto original:', originalPhotoUrl);
          
          // Simula 4 variações da foto original com diferentes estilos
          const mockImages = [
            originalPhotoUrl, // Variação 1: foto original
            originalPhotoUrl, // Variação 2: mesma foto (simula processamento)
            originalPhotoUrl, // Variação 3: mesma foto (simula processamento)
            originalPhotoUrl  // Variação 4: mesma foto (simula processamento)
          ];
          
          return {
            progress: 100,
            image_urls: mockImages
          };
        } else {
          // Fallback para URLs simuladas
          const mockImages = [
            `https://cdn.apiframe.pro/new-images/mock-${taskId}-1.png`,
            `https://cdn.apiframe.pro/new-images/mock-${taskId}-2.png`,
            `https://cdn.apiframe.pro/new-images/mock-${taskId}-3.png`,
            `https://cdn.apiframe.pro/new-images/mock-${taskId}-4.png`
          ];
          
          return {
            progress: 100,
            image_urls: mockImages
          };
        }
      }
      
      return { progress: newProgress };
    }

    const progressUrl = getApiUrl(`/progress/${taskId}`);
    console.log('=== FAZENDO REQUISIÇÃO REAL ===');
    console.log('URL completa:', progressUrl);
    console.log('Método: GET');
    console.log('Headers: Content-Type: application/json');
    console.log('Body: NENHUM (requisição GET)');
    
    // Debug: verifica se o taskId está correto
    console.log('=== DEBUG TASK ID ===');
    console.log('Task ID recebido:', taskId);
    console.log('Tipo do Task ID:', typeof taskId);
    console.log('Task ID é string?', typeof taskId === 'string');
    console.log('Task ID tem tamanho:', taskId ? taskId.length : 'undefined');
    console.log('Task ID é válido?', taskId && taskId.length > 0);
    
    // Verifica se o taskId é válido
    if (!taskId || typeof taskId !== 'string' || taskId.trim() === '') {
      throw new Error('Task ID inválido ou vazio');
    }
    
    // Faz a requisição GET simples (sem body)
    const response = await fetch(progressUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('=== RESPOSTA DA API DE PROGRESSO ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('OK:', response.ok);
    console.log('Headers da resposta:', response.headers);
    console.log('Content-Type:', response.headers.get('content-type'));

    if (!response.ok) {
      throw new Error(`Erro ao verificar progresso: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('=== RESULTADO DA API ===');
    console.log('Resultado completo:', result);
    console.log('Progress:', result.progress);
    console.log('Image URLs:', result.image_urls);
    console.log('Tipo do progress:', typeof result.progress);
    console.log('Progress é número?', typeof result.progress === 'number');
    console.log('Progress é zero?', result.progress === 0);
    console.log('Progress é null?', result.progress === null);
    console.log('Progress é undefined?', result.progress === undefined);
    
    return result;
    
  } catch (error) {
    console.error('❌ ERRO AO VERIFICAR PROGRESSO:', error);
    console.error('Detalhes do erro:', error.message);
    throw error;
  }
};

/**
 * Reseta o progresso mock para desenvolvimento
 */
export const resetMockProgress = () => {
  localStorage.removeItem('mockProgress');
};

/**
 * Simula fotos geradas para desenvolvimento
 * @returns {Array} - Array com fotos simuladas
 */
export const simulateGeneratedPhotos = () => {
  const mockPhotos = [];
  for (let i = 1; i <= 4; i++) {
    mockPhotos.push({
      id: `generated_${Date.now()}_${i}`,
      url: `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`,
      style: 'professional',
      generatedAt: new Date().toISOString()
    });
  }
  return mockPhotos;
};