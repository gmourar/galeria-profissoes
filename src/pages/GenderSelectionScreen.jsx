import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GenderSelectionScreen.css';

const GenderSelectionScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [isAdult, setIsAdult] = useState(null);
  const navigate = useNavigate();

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleAgeSelect = (adult) => {
    setIsAdult(adult);
  };

  const handleContinue = () => {
    if (selectedGender !== null && isAdult !== null) {
      // Salva gênero e maioridade no localStorage
      localStorage.setItem('selectedGender', selectedGender);
      localStorage.setItem('isAdult', JSON.stringify(isAdult));
      
      navigate('/style-selection');
    }
  };

  return (
    <div className="gender-selection-screen">
      <div className="gender-container">
        <h1 className="main-title">Informações</h1>
        
        <h2>Escolha um gênero:</h2>
       
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

        <h3>Você é maior de idade?</h3>

        <div className="age-options">
          <button
            className={`age-button ${isAdult === true ? 'selected' : ''}`}
            onClick={() => handleAgeSelect(true)}
          >
            Sim
          </button>
         
          <button
            className={`age-button ${isAdult === false ? 'selected' : ''}`}
            onClick={() => handleAgeSelect(false)}
          >
            Não
          </button>
        </div>

        <button
          className="continue-button"
          disabled={!selectedGender || isAdult === null}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default GenderSelectionScreen;