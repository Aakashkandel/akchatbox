import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div>

<div class="bg-gray-100">

 
  <header class="bg-white shadow-lg py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      
      <div class="text-2xl font-bold text-blue-600">
        Akchatapp
      </div>
      
      
      <div>
        <Link to="/login" class="text-gray-600 font-semibold px-4 py-2 hover:text-blue-600">Login</Link>
        <Link to="/register" class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">Signup</Link>
      </div>
    </div>
  </header>

 
  <section class="bg-blue-600 text-white h-screen flex items-center justify-center">
    <div class="text-center px-6">
      <h1 class="text-4xl font-bold mb-4">Welcome to Akchatapp</h1>
      <p class="text-lg mb-6">Connect, chat, and stay in touch with your friends anywhere and anytime.</p>
      <a href="#" class="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100 transition">
        Get Started
      </a>
    </div>
  </section>

 
  <footer class="bg-gray-800 text-gray-200 py-6">
    <div class="container mx-auto text-center">
      <p>&copy; 2024 Akchatapp. All rights reserved.</p>
    </div>
  </footer>

</div>
        
    </div>
  )
}