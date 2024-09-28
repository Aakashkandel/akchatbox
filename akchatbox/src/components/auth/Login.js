import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/Axiosapi';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/UserSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const submithandler = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        try {
            const response = await axios.post('/login', { email, password });
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                dispatch(setAuthUser(response.data));
                toast.success("Login successful!"); 
                navigator('/home');
            }
        } catch (error) {
            console.error(error);
            toast.error("Login failed! Please check your credentials."); 
        }
    };

    return (
        <div className="bg-gray-100">
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-blue-600">Akchatapp</h2>
                        <p className="text-gray-600 mt-2">Welcome back! Please login to your account</p>
                    </div>

                    <form onSubmit={submithandler} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
                            <input type="email" id="email" name="email" required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
                            <input type="password" id="password" name="password" required
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Password" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                <label htmlFor="remember_me" className="ml-2 block text-gray-700 font-semibold">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-700">Forgot your password?</a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">Don't have an account?
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
                        </p>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-gray-600 font-bold">Go to Home </p>
                        <Link to="/" className="text-blue-600 hover:underline text-center bg-gray-100 rounded-xl px-2 py-1 mb-4 inline-block">
                            &larr; Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
