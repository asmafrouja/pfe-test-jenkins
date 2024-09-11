import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from "../common";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const resetToken = localStorage.getItem('resetToken') || '';

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            const response = await fetch(SummaryApi.PasswordReset.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword: password, resetToken }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la réinitialisation du mot de passe.');
            }

            const data = await response.json();

            if (data.success) {
                toast.success("Mot de passe réinitialisé avec succès !");
                navigate('/login'); // Redirection vers la page de connexion
            } else {
                toast.error(data.message || 'Erreur inconnue.');
            }
        } catch (error) {
            toast.error(error.message || 'Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <section id="password-reset" className="h-screen flex items-center justify-center mt-3">
            <form className="bg-white p-7 rounded shadow-lg" onSubmit={handlePasswordReset}>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Réinitialiser le mot de passe</h2>
                <p className="text-gray-600 mb-4">Entrez un nouveau mot de passe.</p>
                
                <div className="mb-4">
                    <label htmlFor="password">Nouveau mot de passe :</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Entrer le nouveau mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 bg-slate-100"
                        required
                    />
                </div>

                <div className="mb-10">
                    <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 bg-slate-100"
                        required
                    />
                </div>

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-full w-full mb-3">
                    Réinitialiser le mot de passe
                </button>
            </form>
        </section>
    ); 
};

export default NewPassword;
