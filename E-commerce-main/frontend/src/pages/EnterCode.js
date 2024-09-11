import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SummaryApi from "../common";

const EnterCode = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const email=localStorage.getItem('resetEmail')||'';
    const handleSubmitCode = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(SummaryApi.verifyResetPassword.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code,email }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la vérification du code.');
            }

            const data = await response.json();

            if (data.success) {
                toast.success("Code vérifié avec succès !");
                localStorage.setItem('resetToken',data.resetToken)
                navigate('/new-password'); 
            } else {
                toast.error(data.message || 'Erreur inconnue.');
            }
        } catch (error) {
            toast.error(error.message || 'Erreur lors de la vérification du code.');
        }
    };

    return (
        <section id="enter-code" className="h-screen flex items-center justify-center mt-3">
            <form className="bg-white p-7 rounded shadow-lg" onSubmit={handleSubmitCode}>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Entrer le code</h2>
                <p className="text-gray-600 mb-4">Entrez le code que vous avez reçu par email.</p>
                
                <div className="mb-10">
                    <label htmlFor="code">Code :</label>
                    <input
                        id="code"
                        type="text"
                        placeholder="Entrer le code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full p-2 bg-slate-100"
                        required
                    />
                </div>

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-full w-full mb-3">
                  {/* <Link to={'/new-password'}  > */}
                  Vérifier le code 
                  {/* </Link> */}
                </button>
            </form>
        </section>
    );
};

export default EnterCode;
