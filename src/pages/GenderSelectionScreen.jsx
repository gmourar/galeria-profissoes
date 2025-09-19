import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GenderSelectionScreen.css';

const GenderSelectionScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const navigate = useNavigate();

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender) {
      // Salva o gênero selecionado no localStorage
      localStorage.setItem('selectedGender', selectedGender);
      navigate('/style-selection');
    }
  };

  return (
    <div className="gender-selection-screen">
      <div className="gender-container">
        <h2>Escolha seu gênero:</h2>
        
        <div className="gender-options">
          <button 
            className={`gender-button ${selectedGender === 'masculino' ? 'selected' : ''}`}
            onClick={() => handleGenderSelect('masculino')}
          >
            Masculino
          </button>
          
          <button 
            className={`gender-button ${selectedGender === 'feminino' ? 'selected' : ''}`}
            onClick={() => handleGenderSelect('feminino')}
          >
            Feminino
          </button>
        </div>

        <button 
          className="continue-button"
          disabled={!selectedGender}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default GenderSelectionScreen;
