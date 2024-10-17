import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaUser, FaComments, FaCalendarAlt, FaBox, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Profil from './pages/Profil';
import Forum from './pages/Forum';
import Planning from './pages/Planning';
import CasiersConnectes from './pages/CasiersConnectes';
import './App.css';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  // Gérer la déconnexion
  const handleLogout = async () => {
    try {
      await axios.post('https://directus-ucmn.onrender.com/auth/logout', {
        refresh_token: refreshToken,
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  return (
    <nav>
      {!token && (
        <>
          <Link to="/login"><FaSignInAlt /> Connexion</Link>
          <Link to="/register"><FaUserPlus /> Inscription</Link>
        </>
      )}
      <Link to="/forum"><FaComments /> Forum</Link>
      <Link to="/planning"><FaCalendarAlt /> Planning</Link>

      {token && (
        <>
          <Link to="/casiers-connectes"><FaBox /> Casiers Connectés</Link>
          <Link to="/profil"><FaUser /> Profil</Link>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Déconnexion
          </button>
        </>
      )}
    </nav>
  );
}

function App() {
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const response = await axios.get('https://directus-ucmn.onrender.com/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (!response.data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
    };
    checkTokenValidity();
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        <NavBar />
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
