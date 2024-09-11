import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SummaryApi from "../common";
const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.requestPasswordReset.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la réinitialisation du mot de passe.');
            }

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('resetEmail',email);
                toast.success("Instructions de réinitialisation envoyées à votre email !");
                navigate('/entrer-code'); // Redirection vers la page pour entrer le code
            } else {
                toast.error(data.message || 'Erreur inconnue.');
            }
        } catch (error) {
            toast.error(error.message || 'Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <section id="reset-password" className="h-screen flex items-center justify-center mt-1">
            <form className="bg-white p-7 rounded shadow-lg" onSubmit={handleResetPassword}>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Réinitialiser le mot de passe</h2>
                <p className="text-gray-600 mb-4">Entrez votre email pour recevoir un code de réinitialisation.</p>
                
                <div className="mb-10">
                    <label htmlFor="email">Email :</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Entrer email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-slate-100"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-full w-full mb-3"
                >
                   Demander code 
                </button>
                
                <p className="text-center text-gray-500 text-sm">
                    Se souvenir du mot de passe ?
                    <Link to="/login" className="text-green-600 hover:underline ml-2">Login</Link>
                </p>
                
            </form>
        </section>
    );
};

export default ResetPassword;
