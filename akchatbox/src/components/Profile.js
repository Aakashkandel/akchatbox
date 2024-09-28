import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import image from '../components/assets/images/icon.jpg';
import { selectedUser, setAuthUser, setOtherUser } from './redux/UserSlice';
import { setSocket } from './redux/SocketSlice';
import { setMessages } from './redux/MessageSlice';

export default function Profile() {
  const AuthUser=useSelector((state)=>state.user.authUser);
  const dispatch=useDispatch();
  console.log(AuthUser);

  const handleLogout = () => {
    localStorage.removeItem('token');
   
    dispatch(selectedUser({ name: '', id: '' }));
    dispatch(setOtherUser([]));
    dispatch(setAuthUser(null));
    dispatch(setSocket(null));
    dispatch(setMessages(null));
    window.location.reload();

  };
  return (
    <div class="bg-gray-100">

 
  <div class="min-h-screen flex items-center justify-center p-6 bg-gray-50">

    
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
     
      <Link  to="/home" class="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back
      </Link>

   
      <div class="flex items-center mb-6">
        {
          AuthUser.image?(
            <img src={`http://localhost:5000/uploads/${AuthUser.image}`} alt="User" class="w-16 h-16 object-cover rounded-full" />
          ):(
            <img src={image} alt="User" class="w-16 h-16 object-cover rounded-full" />
          )

        }
        <div class="ml-6">
          <h2 class="text-2xl font-semibold text-gray-800">{AuthUser.name}</h2>
          <p class="text-gray-600">{AuthUser.email}</p>
          <p class="text-green-500 font-semibold">Online</p>
        </div>
      </div>

      
      <div class="border-t border-gray-200 pt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Manage Your Account</h3>
        <ul class="space-y-3">
          <li>
            <Link to="/editprofile" class="block p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Edit Profile</Link>
          </li>
          <li>
            <Link to="/changepassword" class="block p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Change Password</Link>
          </li>
          <li>
          </li>
          <li>
          </li>
          <li>
            <div onClick={handleLogout} class="block p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">Logout</div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</div>
  )
}
