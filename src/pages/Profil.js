import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Profil() {
  const [userData, setUserData] = useState(null); // État pour stocker les données de l'utilisateur
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const [newUsername, setNewUsername] = useState(''); // Initialiser avec une chaîne vide
  const [isUpdating, setIsUpdating] = useState(false); // État pour le statut de mise à jour

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
        setNewUsername(data.data.username || ''); // Initialiser le champ de pseudo, ou chaîne vide si non défini
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []); // Le tableau vide [] signifie que cela s'exécute une seule fois à la montée du composant

  const handleUpdateUsername = async () => {
    setIsUpdating(true); // Définir le statut de mise à jour sur "en cours"
    try {
      const response = await fetch('https://directus-ucmn.onrender.com/users/me', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername, // Mettre à jour le pseudo
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de la mise à jour du pseudo');
      }

      const updatedData = await response.json();
      setUserData(updatedData.data); // Mettre à jour les données locales avec la réponse de l'API
      setIsUpdating(false); // Réinitialiser le statut de mise à jour
    } catch (error) {
      setError(error.message);
      setIsUpdating(false); // Réinitialiser le statut même en cas d'erreur
    }
  };

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

        <div>
          <label><strong>Username :</strong></label>
          <input 
            type="text" 
            value={newUsername || ''} // Assurez-vous que la valeur n'est jamais null
            onChange={(e) => setNewUsername(e.target.value)} 
            disabled={isUpdating}
          />
          <button onClick={handleUpdateUsername} disabled={isUpdating || newUsername === userData.username}>
            {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
          </button>
        </div>
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
