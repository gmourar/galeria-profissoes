import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StyleSelectionScreen.css';

const StyleSelectionScreen = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const navigate = useNavigate();

  const styles = [
    { id: 1, name: 'Executivo', icon: 'EXEC' },
    { id: 2, name: 'Criativo', icon: 'CRIA' },
    { id: 3, name: 'Tecnologia', icon: 'TECH' },
    { id: 4, name: 'Saúde', icon: 'SAUDE' },
    { id: 5, name: 'Educação', icon: 'EDUC' },
    { id: 6, name: 'Artes', icon: 'ARTE' },
    { id: 7, name: 'Esportes', icon: 'ESPO' },
    { id: 8, name: 'Culinária', icon: 'CULI' }
  ];

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
  };

  const handleConfirm = () => {
    if (selectedStyle) {
      // Aqui será implementada a lógica de envio para a IA
      console.log('Estilo selecionado:', selectedStyle);
      // Por enquanto, apenas navega de volta
      navigate('/camera');
    }
  };

  return (
    <div className="style-selection-screen">
      <div className="style-container">
        <h2>Escolha o estilo da sua foto profissional:</h2>
        
        <div className="styles-grid">
          {styles.map((style) => (
            <button
              key={style.id}
              className={`style-button ${selectedStyle === style.id ? 'selected' : ''}`}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="style-icon">{style.icon}</div>
              <div className="style-name">{style.name}</div>
            </button>
          ))}
        </div>

        <button 
          className="confirm-button"
          disabled={!selectedStyle}
          onClick={handleConfirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default StyleSelectionScreen;
