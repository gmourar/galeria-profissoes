// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
  masculino: {
    AGRO: "An agricultural worker, in a wheat field analyzing the crop with a tablet, sunset weather, golden lighting --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaAgroHomem.png --ar 9:16 --cw 50 --sw 50",
    
    BEAUTY: "portrait of a beauty specialist inside a high-tech beauty lab, surrounded by floating skincare bottles and holographic product designs --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaChemistryHomem.png --ar 9:16 --cw 25 --sw 75",
    
    CRYPTO: "a crypto investor inside a crypto warehouse, glowing blockchain chains in the air, bitcoins holograms, rows of bitcoin machines --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaCryptoHomem.png --ar 9:16 ",
    
    ENTREPENEUR: "portrait as an entrepreneur CEO tech innovator standing inside a cybernetic innovation lab, floating holographic circuits screens --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaEntrepreneurHomem.png --ar 9:16",
    
    FASHION: "a fashion designer in his high-tech atelier, clothing racks, fabrics, patterns, scattered through the atelier --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaFashionHomem.png --ar 9:16 --cw 50 --sw 50",
    
    FINANCE: "Financial CEO, standing in front of coworkers at a modern fintech hub, surrounded by people with laptops screens with trading graphs, live charts, collaborative financial innovation space --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaFinanceHomem.png --ar 9:16",
    
    REAL_STATE: "as real state agent, portrait style picture, visible face, standing inside a futuristic real estate showroom, holographic skyscrapers floating around, glowing floor plans and maquetes in the air, high-tech corporate style --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaRealEstateHomem.png --ar 9:16",

    TECH: "portrait of a tech innovator at a hackathon with other developers, open laptops everywhere, cables, coffee cups, neon signage in background, energetic software innovation mood --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaTechHomem.png --ar 9:16",
  },
  
  feminino: {
    AGRO: "An agricultural worker, in a wheat field analyzing the crop with a tablet, sunset weather, golden lighting --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaAgroMulher.png --ar 9:16",
    
    BEAUTY: "portrait of a beauty specialist inside a high-tech beauty lab, surrounded by floating skincare bottles and holographic product designs --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaChemistryMulher.png --ar 9:16",
    
    CRYPTO: "a crypto investor inside a crypto warehouse, glowing blockchain chains in the air, bitcoins holograms, rows of bitcoin machines --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaCryptoMulher.png --ar 9:16",
    
    ENTREPENEUR: "portrait as an entrepreneur CEO tech innovator standing inside a cybernetic innovation lab, floating holographic circuits screens --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaEntrepreneurMulher.png --ar 9:16",
    
    FASHION: "a fashion designer in his high-tech atelier, clothing racks, fabrics, patterns, scattered through the atelier --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaFashionMulher.png --ar 9:16",
    
    FINANCE: "Financial CEO, standing in front of coworkers at a modern fintech hub, surrounded by people with laptops and a big screen with trading graphics, collaborative financial innovation space --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaFinanceMulher.jpeg --ar 9:16",
    
    REAL_STATE: "as real state agent, portrait style picture, visible face, standing inside a futuristic real estate showroom, holographic skyscrapers floating around, glowing floor plans and maquetes in the air, high-tech corporate style --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaRealEstateMulher.png --ar 9:16",
    
    TECH: "portrait of a tech innovator at a hackathon with other developers, open laptops everywhere, cables, coffee cups, neon signage in background, energetic software innovation mood --cref {photoUrl} --sref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaTechMulher.png --ar 9:16"
  }
};

// Estilos disponíveis
export const AVAILABLE_STYLES = [
  { id: 'AGRO', name: 'Agronegócio' },
  { id: 'BEAUTY', name: 'Beleza' },
  { id: 'CRYPTO', name: 'Criptomoedas' },
  { id: 'ENTREPENEUR', name: 'Empreendedor' },
  { id: 'FASHION', name: 'Moda' },
  { id: 'FINANCE', name: 'Finanças' },
  { id: 'TECH', name: 'Tech' },
  { id: 'REAL_STATE', name: 'Mercado imobiliário' }
];

/**
 * Obtém o prompt baseado no gênero e estilo selecionados
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado
 * @param {string} photoUrl - URL da foto original
 * @returns {string} - Prompt formatado
 */
export const getPrompt = (gender, style, photoUrl) => {
  const promptTemplate = PROMPTS_DATA[gender]?.[style];
  if (!promptTemplate) {
    throw new Error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
  }
  
  return promptTemplate.replace('{photoUrl}', photoUrl);
};
