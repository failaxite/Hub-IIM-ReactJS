import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser, FaComments, FaCalendarAlt, FaBox } from 'react-icons/fa'; // Importer les icônes
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
          <Link to="/login"><FaSignInAlt /> Connexion</Link> {/* Icône de connexion */}
          <Link to="/register"><FaUserPlus /> Inscription</Link> {/* Icône d'inscription */}
          <Link to="/profil"><FaUser /> Profil</Link> {/* Icône de profil */}
          <Link to="/forum"><FaComments /> Forum</Link> {/* Icône de forum */}
          <Link to="/planning"><FaCalendarAlt /> Planning</Link> {/* Icône de planning */}
          <Link to="/casiers-connectes"><FaBox /> Casiers Connectés</Link> {/* Icône de casier */}
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
