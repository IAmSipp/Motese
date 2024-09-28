import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import MenuPage from './pages/MenuPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CheckUserPage from './pages/CheckUserPage.jsx';
import TestUIPage from './pages/TestUIPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/checkuser" element={<CheckUserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<TestUIPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
