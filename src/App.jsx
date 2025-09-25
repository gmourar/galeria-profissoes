import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import CameraScreen from './pages/CameraScreen';
import GenderSelectionScreen from './pages/GenderSelectionScreen';
import StyleSelectionScreen from './pages/StyleSelectionScreen';
import LoadingScreen from './pages/LoadingScreen';
import PhotoSelectionScreen from './pages/PhotoSelectionScreen';
import PrintScreen from './pages/PrintScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/camera" element={<CameraScreen />} />
          <Route path="/gender-selection" element={<GenderSelectionScreen />} />
          <Route path="/style-selection" element={<StyleSelectionScreen />} />
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/photo-selection" element={<PhotoSelectionScreen />} />
          <Route path="/print" element={<PrintScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;