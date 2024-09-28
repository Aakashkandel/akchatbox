import React, { useEffect, useRef } from 'react';
import axios from './api/Axiosapi';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from './redux/MessageSlice';
import image from '../components/assets/images/icon.jpg';
import { useGetMessage } from './hooks/useGetMessage';
import { selectedUser } from './redux/UserSlice';

export default function Conversation() {
  const selectedData = useSelector((state) => state.user.selectedUser);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  const authUser = useSelector((state) => state.user.authUser);
  const messages = useSelector((state) => state.message.messages);
  
  const dispatch = useDispatch();
  const { id, name } = selectedData || {};
  const isOnline = onlineUsers.includes(id);
  const messagesEndRef = useRef(null); 

  const fetchMessage = async () => {
    if (!id) return;
    
    try {
      const response = await axios.get(`/message/get/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      dispatch(setMessages(response.data));
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  useGetMessage(); 

  const sendMessage = async (e) => {
    e.preventDefault();

    const { message } = e.target;
    const trimmedMessage = message.value.trim(); // Trim whitespace

    if (!trimmedMessage) return; // Prevent sending empty messages

    const newMessage = {
      id, // recipient's id
      message: trimmedMessage,
      senderId: authUser.id, // authenticated user's id
      createdAt: new Date().toISOString(), // current timestamp
    };

    try {
      // Send the message to the server
      await axios.post(
        `/message/send/${id}`,
        { id, message: trimmedMessage },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      // Update local messages state immediately
      dispatch(setMessages([...messages, newMessage])); // Append new message to existing messages
      message.value = ''; // Clear input
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMessage(); 
    }
    return () => {
      dispatch(setMessages([])); 
    };
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid date';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!id || !name) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg text-center">
          {authUser.image != null ? (
            <img src={`http://localhost:5000/uploads/${authUser.image}`} alt="AkChat Box Logo" className="w-40 ml-5 h-40 rounded-full bg-blue-400 mx-auto" />
          ) : (
            <img src={image} alt="AkChat Box Logo" className="w-16 h-16 ml-5" />
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">AkChat Box</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your one-stop solution for real-time conversations. Connect, chat, and stay online with ease.
          </p>
          <div className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-all">
            Lets Have Conversation!
          </div>
        </div>
      </div>
    );
  }

  const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${id}.svg`;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-white p-6 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <div className="flex items-center">
            <img src={image} alt="User Avatar" className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
              <div className="flex items-center">
                {isOnline ? (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <p className="text-sm text-green-500">Online</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Offline</p>
                )}
              </div>
            </div>
          </div>
          <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-300 transition">
            More Options
          </button>
        </div>

        <div className="flex-1 overflow-y-auto my-4 space-y-4 p-4">
          {messages?.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId !== id ? 'justify-end' : 'justify-start'} items-start`}
            >
              {msg.senderId === id && (
                <img src={avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
              )}
              <div className={`ml-3 max-w-lg ${msg.senderId !== id ? 'text-right' : ''}`}>
                <div
                  className={`p-4 rounded-lg shadow ${msg.senderId !== id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                >
                  {msg.message}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatDate(msg.createdAt)} {/* Format the date */}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
        </div>

        <div className="pt-4 border-t border-gray-300">
          <form className="flex items-center" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              name="message"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
