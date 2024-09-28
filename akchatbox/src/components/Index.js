import React from 'react';
import { Link } from 'react-router-dom';
import aakashImage from '../components/assets/images/aakash.jpg'; // Import your image
import { MdWeb } from 'react-icons/md';

export default function Index() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-7xl mx-auto p-6 sm:p-8 flex flex-col">

        <header className="flex flex-col sm:flex-row justify-between items-center py-1 border-b border-gray-200 space-y-4 sm:space-y-0">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            AkChatBox
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-600 font-semibold px-4 py-2 hover:text-gray-800 transition">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Signup
            </Link>
          </div>
        </header>

        <section className="text-center  sm:my-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Welcome to AkChatBox
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-8">
            Connect, chat, and stay in touch with your friends anywhere and anytime.
          </p>
          <Link to="/home" className="bg-blue-600 text-white font-semibold py-1 sm:py-3 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-blue-700 transition">
            Get Started
          </Link>
        </section>

        <section className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md p-6 sm:p-10">
          <img src={aakashImage} alt="Aakash Kandel" className="h-28 w-28 sm:h-32 sm:w-32 lg:h-60 lg:w-60 rounded-full border-4 border-white shadow-lg mb-4" />
          <p className="text-lg font-semibold text-gray-800">Aakash Kandel</p>
          <p className="text-gray-600 mb-4">MERN Developer | Web Developer</p>
          <div className="flex justify-center mt-4">
            <div className="flex items-center mx-4">
              <MdWeb className="text-blue-600 text-2xl sm:text-3xl" />
              <span className="ml-2 text-base sm:text-lg text-gray-800">Web Developer</span>
            </div>
          </div>
        </section>

        <section className="bg-white mt-8 sm:mt-16 p-6 sm:p-10 shadow-md rounded-lg text-center">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Contact Details</h3>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Email: <a href="mailto:aakashkandel9805@gmail.com" className="text-blue-600 hover:underline">aakashkandel9805@gmail.com</a>
          </p>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">Phone: <span className="text-blue-600">9867491591</span></p>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Website: <a href="https://aakashkandel.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">aakashkandel.com.np</a>
          </p>
        </section>

        <footer className="mt-8 sm:mt-16 text-center text-gray-600 py-4 sm:py-6 border-t border-gray-200">
          <p>&copy; 2024 AkChatBox. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}
