import React, { useState } from 'react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('https://directus-ucmn.onrender.com/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
              const errorData = await response.json(); // Récupérer les données d'erreur
              console.log('Error data:', errorData); // Affiche les données d'erreur
              throw new Error(errorData.message || 'Échec de la connexion');
          }
  
          const data = await response.json();
  
          // Stocker le token dans le localStorage
          localStorage.setItem('access_token', data.data.access_token);
          localStorage.setItem('refresh_token', data.data.refresh_token);
  
          // Rediriger vers la page du profil ou une autre page
          window.location.href = '/profil';
      } catch (error) {
          console.error('Login error:', error); // Affiche l'erreur dans la console
          setErrorMessage(error.message || 'Échec de la connexion. Vérifiez vos informations.');
      }
  };
  
  

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
