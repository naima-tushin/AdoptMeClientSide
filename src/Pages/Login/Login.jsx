import React, { useState } from "react";
import { auth, googleProvider, githubProvider } from "../../firebase/firebase.config";
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Login = () => {
    const [activeTab, setActiveTab] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to dashboard or other page
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            await signInWithPopup(auth, provider);
            // Redirect to dashboard or other page
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (profileImage) {
                const storageRef = ref(storage, `profileImages/${user.uid}`);
                await uploadBytes(storageRef, profileImage);
                const imageUrl = await getDownloadURL(storageRef);

                await updateProfile(user, {
                    displayName: fullName,
                    photoURL: imageUrl,
                });
            } else {
                await updateProfile(user, {
                    displayName: fullName,
                });
            }

            await setDoc(doc(db, "users", user.uid), {
                name: fullName,
                email: email,
                role: "user",
            });

            // Redirect to dashboard or other page
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4" style={{ paddingTop: '100px' }}>
            <Helmet>
                <title>Adopt Me | Login/Register</title>
            </Helmet>
            <div className="flex justify-center mb-4">
                <button className={`mr-2 ${activeTab === "login" ? "bg-blue-500" : "bg-gray-300"} text-white px-4 py-2 rounded-l`} onClick={() => setActiveTab("login")}>Login</button>
                <button className={`ml-2 ${activeTab === "register" ? "bg-blue-500" : "bg-gray-300"} text-white px-4 py-2 rounded-r`} onClick={() => setActiveTab("register")}>Register</button>
            </div>
            {activeTab === "login" ? (
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Login
                    </button>
                </form>
            ) : (
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Profile Image</label>
                        <input
                            type="file"
                            className="w-full p-2"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Register
                    </button>
                </form>
            )}
            <div className="mt-4">
                <button
                    className="w-full p-2 mb-2 bg-red-500 text-white rounded"
                    onClick={() => handleSocialLogin(googleProvider)}
                >
                    Login with Google
                </button>
                <button
                    className="w-full p-2 bg-gray-800 text-white rounded"
                    onClick={() => handleSocialLogin(githubProvider)}
                >
                    Login with GitHub
                </button>
            </div>
        </div>
    );
};

export default Login;
