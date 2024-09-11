import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import loginImage from '../assest/signin1.jpg' 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)

        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }

    console.log("data login", data);

    return (
        <section id='login' className='h-screen'>
            <div className='grid grid-cols-1 lg:grid-cols-2 h-full'>
                {/* Left Side - Form */}
                <div className='flex items-center justify-center bg-white p-5'>
                    <div className='w-full max-w-sm'>
                        <div className='w-full h-20 mx-auto flex items-center justify-center'>
                            <h2 className='text-2xl font-bold text-gray-700'>Welcome Back</h2>
                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label>Email : </label>
                                <div className='bg-slate-100 p-2'>
                                    <input
                                        type='email'
                                        placeholder='entrer email'
                                        name='email'
                                        value={data.email}
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                </div>
                            </div>

                            <div>
                                <label>Mot de passe : </label>
                                <div className='bg-slate-100 p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='entrer mot de passe'
                                        value={data.password}
                                        name='password'
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((prev) => !prev)}>
                                        <span>
                                            {
                                                showPassword ? (
                                                    <FaEyeSlash />
                                                )
                                                    :
                                                    (
                                                        <FaEye />
                                                    )
                                            }
                                        </span>
                                    </div>
                                </div>
                                <Link to={'/reset-password'} className='block w-fit ml-auto hover:underline hover:text-green-600'>
    Mot de passe oublié ?
</Link>

                            </div>

                            <button className='!bg-green-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Connexion</button>

                        </form>

                        <p className='my-5'>Vous n'avez pas de compte ? <Link to={"/sign-up"} className=' text-green-600 hover:text-green-700 hover:underline'>S'inscrire</Link></p>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className='hidden lg:block bg-cover bg-center' style={{ backgroundImage: `url(${loginImage})` }}></div>
            </div>
        </section>
    )
}

export default Login
