// Estrutura de dados com prompts organizados por gênero e estilo
export const PROMPTS_DATA = {
    masculino: {
        AGENCIA: "siting at a desk wearing a casual black crewneck sweater. he accessorizes with a gold necklace, earrings, and a gold watch while smiling warmly at the camera. he is at A vibrant home office space features a hot pink wall decorated with various colorful posters and artwork arranged in a gallery wall style. A laptop, speakers, and other desk accessories are visible on the work surface in the foreground. Creative agency. Professional portrait photography with shallow depth of field creating soft background blur while maintaining sharp subject focus. Natural lighting illuminates the subject evenly, while the vivid pink background creates striking color contrast. Portrait composition, shallow focus, vibrant color palette, natural lighting, environmental portraiture. Maintain the likeness, natural and fresh look",

        CLINICA_DE_ANIMAIS: "wearing a white medical coat, black pants, and a stethoscope around their neck. He is at A modern veterinary clinic interior with glass display cases containing medical supplies and equipment. Clean white tile flooring reflects overhead lighting, while organized shelving units with various medical supplies and containers line the walls behind glass partitions and Four animals - a golden retriever, a black and tan dog, a shaggy white dog, and a gray tabby cat - sit attentively at their feet. Professional medical photography with sharp focus and clean lighting that emphasizes the sterile environment. Natural light streams in from unseen windows, creating subtle shadows and highlighting the crisp white surfaces. Clinical, pristine composition, balanced lighting, professional documentation. Maintain the likeness, natural and fresh look",

        CONSTRUCAO: "standing confidently while holding architectural blueprints, with architecture drawings and calculations on it. He wears a light beige suit jacket with a white button-up shirt and has small stud earrings. at a Modern construction site, glass skyscrapers tower in the background, their reflective surfaces catching the warm light. The urban setting features contemporary architecture with clean vertical lines and metallic accents stretching upward into a bright sky. Golden hour photography creates dramatic lighting with warm amber tones illuminating the subject from the side. Sharp foreground focus with intentional background blur employs professional depth of field. Professional architectural portraiture, golden hour lighting, selective focus, urban minimalism, vertical composition. Maintain the likeness, natural and fresh look",

        COZINHA: "Professional cook poses confidently in a commercial kitchen. he wears a white button-down shirt under a gray apron, with visible bracelet accessories on his wrist. In A professional restaurant kitchen with stainless steel prep stations, industrial heat lamps, and cooking equipment lines the space. Multiple metal pots and pans are arranged on stovetops, while overhead shelving and storage systems extend into the background. Professional portrait photography utilizing natural and industrial lighting to create dramatic shadows and highlights on metallic surfaces. The composition employs shallow depth of field with sharp foreground focus and subtle background blur. Industrial chic, dramatic lighting, metallic textures, selective focus, environmental portraiture. Maintain the likeness, natural and fresh look",

        ESPORTE: "stands confidently with arms crossed. He wears a fitted gray t-shirt, matching athletic shorts, and a smart watch, showcasing his athletic physique and strong posture. Inside a modern fitness facility with large glass windows casting dramatic diagonal shadows across the floor. Exercise equipment and metal frames are visible in the background, bathed in warm, late afternoon sunlight. Shot during golden hour with natural sunlight creating strong directional lighting and dramatic shadows. Sharp focus on the subject with subtle depth of field blur in background. Professional fitness photography with warm color grading and rich contrast. Natural lighting, golden-hour warmth, dramatic shadows, selective focus, cinematic contrast. Maintain the likeness, natural and fresh look",

        FABRICA: "stands confidently with arms crossed. He wears a black waterproof work jacket with a name badge and appears to be in a professional industrial setting. In A vast industrial facility stretches into the background, featuring long automated conveyor belt systems and manufacturing equipment. Metal framework, yellow safety railings, and cardboard boxes line the facility floor, with fluorescent lighting illuminating the expansive space. Industrial documentary photography with sharp foreground focus and depth of field blur. Natural overhead lighting creates even illumination throughout, with metallic surfaces providing subtle reflections. Clean, documentary-style composition with industrial design elements. Industrial realism, environmental portraiture, depth perspective, mechanical precision. Maintain the likeness, natural and fresh look",

        HOSPITAL: "Healthcare worker stands in a professional pose wearing a crisp white medical lab coat over a white undershirt and light gray pants. The lab coat features multiple pockets and button closures down the front, extending to knee length. In A modern hospital intensive care unit corridor with fluorescent overhead lighting illuminates medical equipment, IV stands, and monitoring devices. Turquoise privacy curtains and white storage cabinets line the hallway, while medical carts with wheels are positioned along the walls. Clinical documentary photography with sharp focus and even lighting throughout. The composition emphasizes clean lines and sterile surfaces with a predominantly white and mint-green color palette. Professional institutional lighting creates subtle shadows and highlights on fabric textures. Documentary realism, institutional lighting, medical sterility, balanced composition, minimalist aesthetic. Maintain the likeness, natural and fresh look",

        INFLUENCIADOR: "wearing a light blue crewneck sweatshirt and layered silver necklaces. he holds a professional camera while looking upward with a subtle smile and natural makeup. In A photography studio environment with a soft blue-toned wall backdrop. Dark shapes and equipment are visible in the background, including a mounted camera on a tripod positioned to the right side of the frame. Professional portrait photography with selective depth of field creating sharp focus on the subject against a softly blurred background. Warm rim lighting creates a golden glow on the hair while cool ambient light fills the shadows. Natural, editorial, rim-lit, shallow depth-of-field, studio lighting. Maintain the likeness, natural and fresh look",

        LABORATORIO: "wearing a white laboratory coat over a blue shirt. His expression is professional and assured as he leans slightly against a laboratory counter. In A modern scientific laboratory with multiple workstations features glass beakers, microscopes, and various scientific equipment arranged on white countertops and shelving units. The space is clean and organized with storage drawers beneath the counters and specialized laboratory equipment visible throughout. Cool-toned photography dominated by clinical whites and ethereal blue lighting creates a high-tech, sterile atmosphere. Fluorescent overhead lighting casts a crisp, even illumination while accent lighting adds dramatic blue undertones. Professional, scientific, cool-toned, high-key lighting, laboratory aesthetic. Maintain the likeness, natural and fresh look",

        OFFICE: "standing confidently behind a laptop. He wears a casual black crewneck sweater and layered gold necklaces, maintaining direct eye contact with the camera.In A modern office environment features floor-to-ceiling glass windows and walls, creating a bright, airy atmosphere. Fluorescent lighting fixtures hang from an industrial-style ceiling, while natural light streams through the transparent surfaces. Professional corporate photography with crisp focus and clean composition emphasizes architectural lines and transparency. Natural and artificial lighting blend seamlessly to create depth and dimension. The muted color palette centers on cool grays and blacks. Minimalist, contemporary, architectural, high-key lighting, professional polish. Maintain the likeness, natural and fresh look",

        SALA_DE_AULA: "sits confidently at a desk. He wears a light gray textured button-up shirt and has a warm, engaging smile while looking directly at the camera. In A classroom environment features a large chalkboard on the back wall and wooden bookshelves filled with colorful books along the lower portion. A wooden desk occupies the foreground, creating a professional educational setting. Professional portrait photography with soft, natural lighting creating gentle shadows and depth. Sharp focus on the subject with a subtle depth of field effect blurring the background elements. Clean, documentary-style composition with muted cool tones. Natural lighting, shallow depth-of-field, environmental portraiture, professional clarity, soft shadows. Maintain the likeness, natural and fresh look",

        TECH: "sits confidently in an office chair, wearing an all-white ensemble consisting of a hoodie and matching sweatpants. He has a well-groomed dark beard, short black hair, and maintains a relaxed, professional posture with hands clasped. In A retro-tech workspace filled with vintage CRT monitors displaying various digital graphics and code. Multiple workstations are arranged on white desks, with office chairs scattered throughout. Vertical neon light tubes in various colors line the walls, alongside framed artwork. Cyberpunk-inspired lighting bathes the space in vibrant pink, purple, and blue hues, creating a nostalgic synthwave atmosphere. The vintage technology contrasts with modern lighting elements, while the neon glow creates dramatic shadows and highlights. Retro-futuristic, neon-saturated, synthwave aesthetic, high contrast, ambient glow. Maintain the likeness, natural and fresh look"
    },

    feminino: {
        AGENCIA: "siting at a desk wearing a casual black crewneck sweater. She accessorizes with a gold necklace, earrings, and a gold watch while smiling warmly at the camera. She is at A vibrant home office space features a hot pink wall decorated with various colorful posters and artwork arranged in a gallery wall style. A laptop, speakers, and other desk accessories are visible on the work surface in the foreground. Creative agency. Professional portrait photography with shallow depth of field creating soft background blur while maintaining sharp subject focus. Natural lighting illuminates the subject evenly, while the vivid pink background creates striking color contrast. Portrait composition, shallow focus, vibrant color palette, natural lighting, environmental portraiture. Maintain the likeness, natural and fresh look",

        CLINICA_DE_ANIMAIS: "wearing a white medical coat, black pants, and a stethoscope around their neck. SHe is at A modern veterinary clinic interior with glass display cases containing medical supplies and equipment. Clean white tile flooring reflects overhead lighting, while organized shelving units with various medical supplies and containers line the walls behind glass partitions and Four animals - a golden retriever, a black and tan dog, a shaggy white dog, and a gray tabby cat - sit attentively at their feet. Professional medical photography with sharp focus and clean lighting that emphasizes the sterile environment. Natural light streams in from unseen windows, creating subtle shadows and highlighting the crisp white surfaces. Clinical, pristine composition, balanced lighting, professional documentation. Maintain the likeness, natural and fresh look",

        CONSTRUCAO: "standing confidently while holding architectural blueprints, with architecture drawings and calculations on it. SHe wears a light beige suit jacket with a white button-up shirt and has small stud earrings. at a Modern construction site, glass skyscrapers tower in the background, their reflective surfaces catching the warm light. The urban setting features contemporary architecture with clean vertical lines and metallic accents stretching upward into a bright sky. Golden hour photography creates dramatic lighting with warm amber tones illuminating the subject from the side. Sharp foreground focus with intentional background blur employs professional depth of field. Professional architectural portraiture, golden hour lighting, selective focus, urban minimalism, vertical composition. Maintain the likeness, natural and fresh look",

        COZINHA: "Professional cook poses confidently in a commercial kitchen. She wears a white button-down shirt under a gray apron, with visible bracelet accessories on her wrist. In A professional restaurant kitchen with stainless steel prep stations, industrial heat lamps, and cooking equipment lines the space. Multiple metal pots and pans are arranged on stovetops, while overhead shelving and storage systems extend into the background. Professional portrait photography utilizing natural and industrial lighting to create dramatic shadows and highlights on metallic surfaces. The composition employs shallow depth of field with sharp foreground focus and subtle background blur. Industrial chic, dramatic lighting, metallic textures, selective focus, environmental portraiture. Maintain the likeness, natural and fresh look",

        ESPORTE: "stands confidently with arms crossed. SHe wears a fitted gray t-shirt, matching athletic shorts, and a smart watch, showcasing her athletic physique and strong posture. Inside a modern fitness facility with large glass windows casting dramatic diagonal shadows across the floor. Exercise equipment and metal frames are visible in the background, bathed in warm, late afternoon sunlight. Shot during golden hour with natural sunlight creating strong directional lighting and dramatic shadows. Sharp focus on the subject with subtle depth of field blur in background. Professional fitness photography with warm color grading and rich contrast. Natural lighting, golden-hour warmth, dramatic shadows, selective focus, cinematic contrast. Maintain the likeness, natural and fresh look",

        FABRICA: "stands confidently with arms crossed. SHe wears a black waterproof work jacket with a name badge and appears to be in a professional industrial setting. In A vast industrial facility stretches into the background, featuring long automated conveyor belt systems and manufacturing equipment. Metal framework, yellow safety railings, and cardboard boxes line the facility floor, with fluorescent lighting illuminating the expansive space. Industrial documentary photography with sharp foreground focus and depth of field blur. Natural overhead lighting creates even illumination throughout, with metallic surfaces providing subtle reflections. Clean, documentary-style composition with industrial design elements. Industrial realism, environmental portraiture, depth perspective, mechanical precision. Maintain the likeness, natural and fresh look",

        HOSPITAL: "Healthcare worker stands in a professional pose wearing a crisp white medical lab coat over a white undershirt and light gray pants. The lab coat features multiple pockets and button closures down the front, extending to knee length. In A modern hospital intensive care unit corridor with fluorescent overhead lighting illuminates medical equipment, IV stands, and monitoring devices. Turquoise privacy curtains and white storage cabinets line the hallway, while medical carts with wheels are positioned along the walls. Clinical documentary photography with sharp focus and even lighting throughout. The composition emphasizes clean lines and sterile surfaces with a predominantly white and mint-green color palette. Professional institutional lighting creates subtle shadows and highlights on fabric textures. Documentary realism, institutional lighting, medical sterility, balanced composition, minimalist aesthetic. Maintain the likeness, natural and fresh look",

        INFLUENCIADOR: "wearing a light blue crewneck sweatshirt and layered silver necklaces. She holds a professional camera while looking upward with a subtle smile and natural makeup. In A photography studio environment with a soft blue-toned wall backdrop. Dark shapes and equipment are visible in the background, including a mounted camera on a tripod positioned to the right side of the frame. Professional portrait photography with selective depth of field creating sharp focus on the subject against a softly blurred background. Warm rim lighting creates a golden glow on the hair while cool ambient light fills the shadows. Natural, editorial, rim-lit, shallow depth-of-field, studio lighting. Maintain the likeness, natural and fresh look",

        LABORATORIO: "wearing a white laboratory coat over a blue shirt. Her expression is professional and assured as she leans slightly against a laboratory counter. In A modern scientific laboratory with multiple workstations features glass beakers, microscopes, and various scientific equipment arranged on white countertops and shelving units. The space is clean and organized with storage drawers beneath the counters and specialized laboratory equipment visible throughout. Cool-toned photography dominated by clinical whites and ethereal blue lighting creates a high-tech, sterile atmosphere. Fluorescent overhead lighting casts a crisp, even illumination while accent lighting adds dramatic blue undertones. Professional, scientific, cool-toned, high-key lighting, laboratory aesthetic. Maintain the likeness, natural and fresh look",

        OFFICE: "standing confidently behind a laptop. She wears a casual black crewneck sweater and layered gold necklaces, maintaining direct eye contact with the camera.In A modern office environment features floor-to-ceiling glass windows and walls, creating a bright, airy atmosphere. Fluorescent lighting fixtures hang from an industrial-style ceiling, while natural light streams through the transparent surfaces. Professional corporate photography with crisp focus and clean composition emphasizes architectural lines and transparency. Natural and artificial lighting blend seamlessly to create depth and dimension. The muted color palette centers on cool grays and blacks. Minimalist, contemporary, architectural, high-key lighting, professional polish. Maintain the likeness, natural and fresh look",

        SALA_DE_AULA: "sits confidently at a desk. She wears a light gray textured button-up shirt and has a warm, engaging smile while looking directly at the camera. In A classroom environment features a large chalkboard on the back wall and wooden bookshelves filled with colorful books along the lower portion. A wooden desk occupies the foreground, creating a professional educational setting. Professional portrait photography with soft, natural lighting creating gentle shadows and depth. Sharp focus on the subject with a subtle depth of field effect blurring the background elements. Clean, documentary-style composition with muted cool tones. Natural lighting, shallow depth-of-field, environmental portraiture, professional clarity, soft shadows. Maintain the likeness, natural and fresh look",

        TECH: "sits confidently in an office chair, wearing an all-white ensemble consisting of a hoodie and matching sweatpants. She maintains a relaxed, professional posture with hands clasped. In A retro-tech workspace filled with vintage CRT monitors displaying various digital graphics and code. Multiple workstations are arranged on white desks, with office chairs scattered throughout. Vertical neon light tubes in various colors line the walls, alongside framed artwork. Cyberpunk-inspired lighting bathes the space in vibrant pink, purple, and blue hues, creating a nostalgic synthwave atmosphere. The vintage technology contrasts with modern lighting elements, while the neon glow creates dramatic shadows and highlights. Retro-futuristic, neon-saturated, synthwave aesthetic, high contrast, ambient glow. Maintain the likeness, natural and fresh look"
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