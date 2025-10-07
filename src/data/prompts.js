// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
    masculino: {
        AGENCIA: "as a creative executive (preserve 100% of the face) in an advertising agency office, vibrant walls with motivational posters, laptops, brainstorming session atmosphere, semi-formal clothing, cinematic corporate photography",

        CLINICA_DE_ANIMAIS: "as a veterinarian in a modern animal clinic, surrounded by pets, medical equipment, caring atmosphere, professional attire, compassionate expression",

        CONSTRUCAO: "as a construction professional on a building site, wearing safety gear, hard hat, construction equipment in background, confident pose, industrial setting",

        COZINHA: "as a professional chef in a modern kitchen, cooking equipment, fresh ingredients, chef's uniform, dynamic culinary environment, professional kitchen atmosphere",

        ESPORTE: "as an athlete in a modern sports facility, athletic wear, training equipment, energetic pose, professional sports environment, motivational atmosphere",

        FABRICA: "as a factory supervisor in an industrial manufacturing facility, safety equipment, machinery in background, professional industrial setting, confident leadership pose",

        HOSPITAL: "as a healthcare professional in a modern hospital, medical attire, hospital equipment, caring expression, professional medical environment",

        INFLUENCIADOR: "as a content creator in a modern studio setup, ring light, camera equipment, trendy casual clothing, engaging expression, social media aesthetic",

        LABORATORIO: "as a scientist in a modern laboratory, lab coat, scientific equipment, research materials, professional scientific environment, focused expression",

        OFFICE: "as a business professional in a modern office, contemporary workspace, computer setup, business casual attire, professional corporate environment",

        SALA_DE_AULA: "as an educator in a modern classroom, teaching materials, whiteboard or digital board, professional teaching attire, engaging with students atmosphere",

        TECH: "as a tech professional in a modern tech workspace, multiple monitors, coding environment, casual tech attire, innovative atmosphere, digital equipment"
    },

    feminino: {
        AGENCIA: "as a creative executive (preserve 100% of the face) in an advertising agency office, vibrant walls with motivational posters, laptops, brainstorming session atmosphere, semi-formal clothing, cinematic corporate photography",

        CLINICA_DE_ANIMAIS: "as a veterinarian in a modern animal clinic, surrounded by pets, medical equipment, caring atmosphere, professional attire, compassionate expression",

        CONSTRUCAO: "as a construction professional on a building site, wearing safety gear, hard hat, construction equipment in background, confident pose, industrial setting",

        COZINHA: "as a professional chef in a modern kitchen, cooking equipment, fresh ingredients, chef's uniform, dynamic culinary environment, professional kitchen atmosphere",

        ESPORTE: "as an athlete in a modern sports facility, athletic wear, training equipment, energetic pose, professional sports environment, motivational atmosphere",

        FABRICA: "as a factory supervisor in an industrial manufacturing facility, safety equipment, machinery in background, professional industrial setting, confident leadership pose",

        HOSPITAL: "as a healthcare professional in a modern hospital, medical attire, hospital equipment, caring expression, professional medical environment",

        INFLUENCIADOR: "as a content creator in a modern studio setup, ring light, camera equipment, trendy casual clothing, engaging expression, social media aesthetic",

        LABORATORIO: "as a scientist in a modern laboratory, lab coat, scientific equipment, research materials, professional scientific environment, focused expression",

        OFFICE: "as a business professional in a modern office, contemporary workspace, computer setup, business casual attire, professional corporate environment",

        SALA_DE_AULA: "as an educator in a modern classroom, teaching materials, whiteboard or digital board, professional teaching attire, engaging with students atmosphere",

        TECH: "as a tech professional in a modern tech workspace, multiple monitors, coding environment, casual tech attire, innovative atmosphere, digital equipment"
    }
};

// URLs de referência de estilo para cada prompt
// Nota: As URLs são as mesmas para masculino e feminino
export const STYLE_REFERENCES = {
    masculino: {
        AGENCIA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaAgencia.png",
        CLINICA_DE_ANIMAIS: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaClinica.png",
        CONSTRUCAO: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaConstrucao.png",
        COZINHA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaCozinha.png",
        ESPORTE: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaEsporte.png",
        FABRICA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaFabrica.png",
        HOSPITAL: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaHospital.png",
        INFLUENCIADOR: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaInfluencuador.png",
        LABORATORIO: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaLaboratorio.png",
        OFFICE: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaOffice.png",
        SALA_DE_AULA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaSaladeaula.png",
        TECH: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaTech.png"
    },
    feminino: {
        AGENCIA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaAgencia.png",
        CLINICA_DE_ANIMAIS: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/ReferenciaClinica.png",
        CONSTRUCAO: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaConstrucao.png",
        COZINHA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaCozinha.png",
        ESPORTE: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaEsporte.png",
        FABRICA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaFabrica.png",
        HOSPITAL: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaHospital.png",
        INFLUENCIADOR: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaInfluencuador.png",
        LABORATORIO: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaLaboratorio.png",
        OFFICE: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaOffice.png",
        SALA_DE_AULA: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaSaladeaula.png",
        TECH: "https://fotoai-picbrand.s3.sa-east-1.amazonaws.com/referenciaTech.png"
    }
};

// Estilos disponíveis
export const AVAILABLE_STYLES = [
    { id: 'AGENCIA', name: 'Agência' },
    { id: 'CLINICA_DE_ANIMAIS', name: 'Clínica de Animais' },
    { id: 'CONSTRUCAO', name: 'Construção' },
    { id: 'COZINHA', name: 'Cozinha' },
    { id: 'ESPORTE', name: 'Esporte' },
    { id: 'FABRICA', name: 'Fábrica' },
    { id: 'HOSPITAL', name: 'Hospital' },
    { id: 'INFLUENCIADOR', name: 'Influenciador' },
    { id: 'LABORATORIO', name: 'Laboratório' },
    { id: 'OFFICE', name: 'Office' },
    { id: 'SALA_DE_AULA', name: 'Sala de Aula' },
    { id: 'TECH', name: 'Tech' }
];

/**
 * Obtém o prompt baseado no gênero e estilo selecionados
 * Para Runway: retorna apenas o texto descritivo, sem URLs
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado (ex: 'AGENCIA')
 * @returns {string} - Prompt formatado para Runway
 */
export const getPrompt = (gender, style) => {
    const promptTemplate = PROMPTS_DATA[gender]?.[style];
    if (!promptTemplate) {
        console.error(`Prompt não encontrado para gênero: ${gender} e estilo: ${style}`);
        // Fallback para AGENCIA
        return PROMPTS_DATA[gender]?.AGENCIA || PROMPTS_DATA.masculino.AGENCIA;
    }

    console.log('=== PROMPT SELECIONADO ===');
    console.log('Gênero:', gender);
    console.log('Estilo:', style);
    console.log('Prompt:', promptTemplate);

    return promptTemplate;
};

/**
 * Obtém a URL de referência de estilo
 * @param {string} gender - Gênero selecionado ('masculino' ou 'feminino')
 * @param {string} style - Estilo selecionado (ex: 'AGENCIA')
 * @returns {string} - URL da imagem de referência
 */
export const getStyleReference = (gender, style) => {
    const styleRef = STYLE_REFERENCES[gender]?.[style];
    if (!styleRef) {
        console.warn(`Referência de estilo não encontrada para ${gender} - ${style}`);
        return STYLE_REFERENCES[gender]?.AGENCIA || STYLE_REFERENCES.masculino.AGENCIA;
    }

    console.log('=== REFERÊNCIA DE ESTILO ===');
    console.log('Gênero:', gender);
    console.log('Estilo:', style);
    console.log('URL:', styleRef);

    return styleRef;
};

/**
 * Valida se um estilo existe
 * @param {string} styleId - ID do estilo
 * @returns {boolean}
 */
export const isValidStyle = (styleId) => {
    return AVAILABLE_STYLES.some(s => s.id === styleId);
};

/**
 * Obtém informações de um estilo
 * @param {string} styleId - ID do estilo
 * @returns {object|null}
 */
export const getStyleInfo = (styleId) => {
    return AVAILABLE_STYLES.find(s => s.id === styleId) || null;
};