import React, { useState } from 'react';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1YzdiNmJlLTVlYTktNGQ4YS05ODExLWZjOTY1Y2U3Y2QyYyIsInJvbGUiOiIxZDliYmYzNC04Njg0LTQ5MjctODdlYS0yOGVmMWU2ZTAzYzQiLCJhcHBfYWNjZXNzIjp0cnVlLgJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTcyOTA3ODMxNiwiZXhwIjoxNzI5MDc5MjE2LCJpc3MiOiJkaXJlY3R1cyJ9.LjIJVNbRcmr0ev3XDyd4rq3w-D5xiLPkCz2e1uulsjY'; // Remplacer avec le bon token

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://directus-ucmn.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Échec de l\'inscription');
            }

            window.location.href = '/login';
        } catch (error) {
            setErrorMessage('Échec de l\'inscription. Vérifiez vos informations.');
        }
    };

    return (
        <div className="register-container">
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
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
                <div className="form-group">
                    <label>Prénom</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Register;
