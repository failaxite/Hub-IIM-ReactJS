// Profil.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profil() {
  const [userData, setUserData] = useState(null); // État pour stocker les données de l'utilisateur
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://directus-ucmn.onrender.com/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Utiliser le token d'accès
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la récupération des données utilisateur');
        }

        const data = await response.json();
        setUserData(data.data); // Stocker les données de l'utilisateur
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []); // Le tableau vide [] signifie que cela s'exécute une seule fois à la montée du composant

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>; // Afficher un message d'erreur si nécessaire
  }

  if (!userData) {
    return <p>Chargement des données...</p>; // Afficher un message de chargement tant que les données ne sont pas disponibles
  }

  return (
    <div className="profil-container">
      <h2>Mon Profil</h2>
      <p>Bienvenue sur votre page de profil.</p>
      <div className="user-info">
        <p><strong>Nom :</strong> {userData.first_name} {userData.last_name}</p>
        <p><strong>Email :</strong> {userData.email}</p>
        <p><strong>Username :</strong> {userData.username}</p>
        <p><strong>Mot de Passe :</strong> {userData.password}</p>
      </div>
      <div className="navigation-links">
        <Link to="/forum">Accéder au Forum</Link>
        <Link to="/planning">Voir le Planning</Link>
        <Link to="/casiers-connectes">Gérer les Casiers Connectés</Link>
      </div>
    </div>
  );
}

export default Profil;
