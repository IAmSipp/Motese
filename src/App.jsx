import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import CheckUserPage from './pages/CheckUserPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MenuPage from './pages/MenuPage.jsx';
import ProfilePage from './pages/Profile.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TestUIPage from './pages/TestUIPage.jsx';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/checkuser" element={<CheckUserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test" element={<TestUIPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
