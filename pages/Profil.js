// Profil.js
import React from 'react';
import { Link } from 'react-router-dom';

function Profil() {
  return (
    <div className="profil-container">
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page de profil.</p>
      <div className="navigation-links">
        <Link to="/forum">Accéder au Forum</Link>
        <Link to="/planning">Voir le Planning</Link>
        <Link to="/casiers-connectes">Gérer les Casiers Connectés</Link>
      </div>
    </div>
  );
}

export default Profil;
