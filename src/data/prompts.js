// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
  masculino: {
    AGRO: "An agricultural worker, in a wheat field analyzing the crop with a tablet, sunset weather, golden lighting --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    BEAUTY: "portrait of a beauty specialist inside a high-tech beauty lab, surrounded by floating skincare bottles and holographic product designs --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    CRYPTO: "portrait as a crypto investor inside a cyberpunk crypto lab, glowing blockchain chains in the air, bitcoins holograms, futuristic investment aesthetic, studio lighting --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    ENTREPENEUR: "portrait as an entrepreneur CEO tech innovator standing inside a cybernetic innovation lab, floating holographic circuits screens --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    FASHION: "portrait of a person wearing a red varsity jacket worn over a tight black t-shirt, paired with distressed cargo jeans, accessorized with layers of red scarves and shawls, a large watch, sunglasses, and chunky sneakers, this person is holding a red guitar with white accents. The background features a massive rock festival stage with bright strobe lights and a crowd pumping with energy, a person has spotless skin, wrinkle free skin, smooth skin --cref https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/foto8.png --sref https://koala.sh/api/image/v2-c9lyf-7aovd.jpg?width=1216&height=832&dream --ar 9:16 --cw 50 --sw 50",
    
    FINANCE: "Financial CEO, standing in front of coworkers at a modern fintech hub, surrounded by people with laptops and a big screen with trading graphics, collaborative financial innovation space --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    REAL_STATE: "portrait as a real state agent, portrait style picture, visible face, standing inside a futuristic real estate showroom, holographic skyscrapers floating around, glowing floor plans in the air, high-tech corporate style --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    TECH: "portrait of a tech innovator at a hackathon with other developers, open laptops everywhere, cables, coffee cups, neon signage in background, energetic software innovation mood --cref {photoUrl} --sref {styleRef} --ar 9:16"
  },
  
  feminino: {
    AGRO: "An agricultural worker, in a wheat field analyzing the crop with a tablet, sunset weather, golden lighting --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    BEAUTY: "portrait of a beauty specialist inside a high-tech beauty lab, surrounded by floating skincare bottles and holographic product designs --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    CRYPTO: "portrait as a crypto investor inside a cyberpunk crypto lab, glowing blockchain chains in the air, bitcoins holograms, futuristic investment aesthetic, studio lighting --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    ENTREPENEUR: "portrait as an entrepreneur CEO tech innovator standing inside a cybernetic innovation lab, floating holographic circuits screens --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    FASHION: "a fashion designer in his high tech atelier --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    FINANCE: "Financial CEO, standing in front of coworkers at a modern fintech hub, surrounded by people with laptops and a big screen with trading graphics, collaborative financial innovation space --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    REAL_STATE: "portrait as a real state agent, portrait style picture, visible face, standing inside a futuristic real estate showroom, holographic skyscrapers floating around, glowing floor plans in the air, high-tech corporate style --cref {photoUrl} --sref {styleRef} --ar 9:16",
    
    TECH: "portrait of a tech innovator at a hackathon with other developers, open laptops everywhere, cables, coffee cups, neon signage in background, energetic software innovation mood --cref {photoUrl} --sref {styleRef} --ar 9:16"
  }
};

// Estilos disponíveis
export const AVAILABLE_STYLES = [
  { id: 'AGRO', name: 'Agro', icon: '🌾' },
  { id: 'BEAUTY', name: 'Beauty', icon: '✨' },
  { id: 'CRYPTO', name: 'Crypto', icon: '₿' },
  { id: 'ENTREPENEUR', name: 'Empreendedor', icon: '💼' },
  { id: 'FASHION', name: 'Fashion', icon: '👗' },
  { id: 'FINANCE', name: 'Finance', icon: '💰' },
  { id: 'TECH', name: 'Tech', icon: '💻' },
  { id: 'REAL_STATE', name: 'Real Estate', icon: '🏢' }
];

/**
 * Obtém o prompt baseado no gênero e estilo selecionados
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado
 * @param {string} photoUrl - URL da foto original
 * @param {string} styleRef - URL de referência de estilo
 * @returns {string} - Prompt formatado
 */
export const getPrompt = (gender, style, photoUrl, styleRef) => {
  const promptTemplate = PROMPTS_DATA[gender]?.[style];
  if (!promptTemplate) {
    throw new Error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
  }
  
  return promptTemplate
    .replace('{photoUrl}', photoUrl)
    .replace('{styleRef}', styleRef);
};
