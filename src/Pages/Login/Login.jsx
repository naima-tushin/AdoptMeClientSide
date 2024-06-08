import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser, FaLink } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/logo.png';
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const { signInUser, createUser, updateUserProfile, user } = useAuth();
    const [showLoginPass, setShowLoginPass] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm();

    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const handleLogin = (data) => {
        const { email, password } = data;

        signInUser(email, password)
            .then((result) => {
                if (result.user) {
                    toast.success('Logged In successfully!!!')
                    setTimeout(() => {
                        navigate(from);
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Invalid Email or Password!!!");
            })
    }

    const handleRegister = (data) => {
        const { email, password, fullname, imageURL } = data;

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            toast.error('Password should be at least 6 characters and contain at least one uppercase letter and one lowercase letter');
            return;
        }

        createUser(email, password)
            .then(() => {
                updateUserProfile(fullname, imageURL)
                    .then(() => {
                        const userInfo = {
                            name: fullname,
                            email: email,
                            role: 'user'
                        }
                        axiosPublic.post('/User', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User Added to Database')
                                    toast.success("Signed Up Successfully!");
                                    setTimeout(() => {
                                        navigate(from);
                                    }, 1000);
                                }
                            })
                    });
            })
            .catch((error) => {
                console.error(error);
                toast.error('Email already exists');
            });
    };

    return (
        <div className="font-roboto min-h-screen flex justify-center items-center">
            <Helmet>
                <title>Adopt Me | Login/Register</title>
            </Helmet>
            <div className="w-full max-w-md my-10">
                <div className="flex justify-center mb-4">
                    <img className="w-1/5" src={logo} alt="" />
                </div>
                <div className="bg-secondary shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex justify-center mb-6">
                        <button
                            className={`mr-4 py-2 px-4 rounded focus:outline-none ${activeTab === 'login' ? 'bg-black text-accent' : 'text-black hover:bg-primary hover:text-black'
                                }`}
                            onClick={() => setActiveTab('login')}
                        >
                            Login
                        </button>
                        <button
                            className={`py-2 px-4 rounded focus:outline-none ${activeTab === 'register' ? 'bg-black text-accent' : 'text-black hover:bg-primary hover:text-black'
                                }`}
                            onClick={() => setActiveTab('register')}
                        >
                            Register
                        </button>
                    </div>
                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit(handleLogin)}>
                            <div className="mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        {...registerLogin("email", { required: true })}
                                        className="input input-bordered pl-10 w-full"
                                    />
                                    <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                </div>
                                {loginErrors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="mb-6">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showLoginPass ? "text" : "password"}
                                        placeholder="Enter Your Password"
                                        {...registerLogin("password", { required: true })}
                                        className="input input-bordered pl-10 w-full"
                                    />
                                    <span
                                        onClick={() => setShowLoginPass(!showLoginPass)}
                                        className="absolute top-7 right-3 transform -translate-y-1/2 h-6 text-xl text-primary"
                                    >
                                        {showLoginPass ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                </div>
                                {loginErrors.password && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="mb-6">
                                <button className="btn w-full bg-black hover:bg-primary hover:text-black text-accent border-4 border-primary hover:border-black text-base">Login</button>
                            </div>
                        </form>
                    )}
                    {activeTab === 'register' && (
                        <form onSubmit={handleRegisterSubmit(handleRegister)}>
                            <div className="lg:flex md:flex justify-between">
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="fullname">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Enter Your Full Name"
                                                {...registerRegister("fullname", { required: true })}
                                                className="input input-bordered pl-10 w-full"
                                            />
                                            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                        </div>
                                        {registerErrors.fullname && <span className="text-red-500">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                placeholder="Enter Your Email"
                                                {...registerRegister("email", { required: true })}
                                                className="input input-bordered pl-10 w-full" />
                                            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                        </div>
                                        {registerErrors.email && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="imageURL">
                                            Photo URL
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Enter Photo URL"
                                                {...registerRegister("imageURL", { required: true })}
                                                className="input input-bordered pl-10 w-full"
                                            />
                                            <FaLink className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                        </div>
                                        {registerErrors.imageURL && <span className="text-red-500">This field is required</span>}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                placeholder="Enter Your Password"
                                                {...registerRegister("password", { required: true })}
                                                className="input input-bordered pl-10 w-full"
                                            />
                                            <span
                                                onClick={() => setShowPass(!showPass)}
                                                className="absolute top-7 right-3 transform -translate-y-1/2 h-6 text-xl text-primary"
                                            >
                                                {showPass ? <FaEyeSlash /> : <FaEye />}
                                            </span>
                                            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 h-6 text-primary" />
                                        </div>
                                        {registerErrors.password && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6">
                                <button className="btn w-full bg-black hover:bg-primary hover:text-black text-accent border-4 border-primary hover:border-black text-base">Register</button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="text-center">
                    <p className="text-sm text-white">{activeTab === 'login' ? "Don't have an account yet?" : "Already have an account?"} <Link to={activeTab === 'login' ? "/register" : "/login"} className="font-bold text-black">{activeTab === 'login' ? "Register" : "Login"}</Link></p>
                </div>
                <SocialLogin />
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;