import React, { useEffect, useState } from 'react';
import Conversation from '../Conversation';
import axios from '../api/Axiosapi';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUser, selectedUser, setAuthUser } from '../redux/UserSlice';
import { setSocket } from '../redux/SocketSlice';
import icon from '../../components/assets/images/icon.jpg';
import { Link } from 'react-router-dom';
import { setMessages } from '../redux/MessageSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.otherUser);
  const onlineUsers = useSelector(state => state.user.onlineUsers);

  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(setOtherUser(response.data));
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (user) => {
    dispatch(selectedUser({ name: user.name, id: user._id }));
    setSidebarVisible(false); 
  };

  return (
    <div className="flex min-h-screen">
 
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarVisible(!sidebarVisible)}
          className="p-2 bg-blue-600 text-white rounded-full shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

     
      <div className="hidden lg:flex flex-col w-72 bg-white shadow-lg fixed h-full">
        <div className="p-6 bg-blue-700 text-white font-bold text-2xl text-center uppercase tracking-wide">
          AkChat Box
        </div>

       
        <div className="p-4 bg-gray-100 flex flex-col">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        </div>

       
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
          <ul className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <button
                  onClick={() => handleUserSelect(user)}
                  key={user._id}
                  className="hover:bg-gray-100 rounded-lg transition cursor-pointer p-3 flex items-center space-x-3"
                >
                  <div className="relative flex items-center">
                    {user.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${user?.image}`}
                        alt="User"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src={icon}
                        alt="User"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute right-0 bottom-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-400 text-sm">Click to send a message</p>
                  </div>
                </button>
              ))
            ) : (
              <li className="text-gray-500">No users found</li>
            )}
          </ul>
        </div>

       
        <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
          <Link to="/profile">
            <button
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-full text-center font-semibold hover:bg-gray-200 transition ease-in-out duration-300 transform hover:scale-105"
            >
              Settings
            </button>
          </Link>
        </div>
      </div>

     
      <div className={`lg:hidden flex flex-col w-72 bg-white shadow-lg fixed h-full transition-transform transform ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 bg-blue-700 text-white font-bold text-2xl text-center uppercase tracking-wide">
          AkChat Box
        </div>

      
        <div className="p-4 bg-gray-100 flex flex-col">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        </div>

      
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
          <ul className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <button
                  onClick={() => handleUserSelect(user)}
                  key={user._id}
                  className="hover:bg-gray-100 rounded-lg transition cursor-pointer p-3 flex items-center space-x-3"
                >
                  <div className="relative flex items-center">
                    {user.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${user?.image}`}
                        alt="User"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src={icon}
                        alt="User"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    )}
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute right-0 bottom-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
                    <p className="text-gray-400 text-sm">Click to send a message</p>
                  </div>
                </button>
              ))
            ) : (
              <li className="text-gray-500">No users found</li>
            )}
          </ul>
        </div>

     
        <div className="p-4 border-t border-gray-200 flex flex-col space-y-2">
          <Link to="/profile">
            <button
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-full text-center font-semibold hover:bg-gray-200 transition ease-in-out duration-300 transform hover:scale-105"
            >
              Settings
            </button>
          </Link>
        </div>
      </div>

     
      <div className={`flex-1 lg:ml-72 transition-all duration-300 ${sidebarVisible ? 'opacity-100' : 'opacity-100'}`}>
        <Conversation />
      </div>
    </div>
  );
}
