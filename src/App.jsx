import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CameraProvider } from './contexts/CameraContext.jsx';
import { GameProvider } from './contexts/GameContext.jsx';
import { UserProvider } from './contexts/UserContext.jsx';

// Pages
import CheckUserPage from './pages/CheckUserPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ProfilePage from './pages/Profile.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TestUIPage from './pages/TestUIPage.jsx';

// Game pages
import GamePage from './pages/game_pages/GamePage.jsx';
import StageSelection from './pages/game_pages/StageSelectionPage.jsx';
import LevelSelection from './pages/game_pages/LevelSelectionPage.jsx';
import TutorialVideo from './pages/game_pages/TutorialPage.jsx';

const App = () => {
  return (
    <UserProvider>
      <GameProvider>
        <CameraProvider>
          <Router>
            <Routes>
              {/* User-related routes */}
              <Route path="/" element={<MenuPage />} />
              <Route path="/checkuser" element={<CheckUserPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/test" element={<TestUIPage />} />

              {/* Game-related routes */}
              <Route path="/game" element={<GamePage />} />
              <Route path="/stage" element={<StageSelection />} />
              <Route path="/level" element={<LevelSelection />} />
              <Route path="/tutorial" element={<TutorialVideo />} />
            </Routes>
          </Router>
        </CameraProvider>
      </GameProvider>
    </UserProvider>
  );
};

export default App;
