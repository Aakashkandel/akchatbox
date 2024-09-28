import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/Axiosapi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigator = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.password_confirmation.value;

    try {
      const response = await axios.post('/register', {
        name,
        email,
        password,
        confirmpassword
      });

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        toast.success("Registration successful!"); // Success toast
        navigator('/home');
      }

      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Please try again."); // Error toast
    }
  };

  return (
    <div className="bg-gray-100">
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-600">Akchatapp</h2>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold">Full Name</label>
              <input type="text" id="name" name="name" required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            </div>

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

            <div>
              <label htmlFor="password_confirmation" className="block text-gray-700 font-semibold">Confirm Password</label>
              <input type="password" id="password_confirmation" name="password_confirmation" required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" />
            </div>

            <div>
              <button type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
                Sign Up
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">Already have an account?
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
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
