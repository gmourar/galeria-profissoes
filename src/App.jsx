import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CameraScreen from './pages/CameraScreen';
import GenderSelectionScreen from './pages/GenderSelectionScreen';
import StyleSelectionScreen from './pages/StyleSelectionScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/camera" replace />} />
          <Route path="/camera" element={<CameraScreen />} />
          <Route path="/gender-selection" element={<GenderSelectionScreen />} />
          <Route path="/style-selection" element={<StyleSelectionScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
