import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import Forum from './pages/Forum';
import Planning from './pages/Planning';
import CasiersConnectes from './pages/CasiersConnectes';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
          <Link to="/profil">Profil</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/planning">Planning</Link>
          <Link to="/casiers-connectes">Casiers Connectés</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/casiers-connectes" element={<CasiersConnectes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
