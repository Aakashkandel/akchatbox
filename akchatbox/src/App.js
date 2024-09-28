import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Sidebar from './components/layouts/Sidebar';
import UserProtected from './components/auth/protected/UserProtected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './components/redux/SocketSlice';
import { setOnlineUsers } from './components/redux/UserSlice';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import NotFound from './components/NotFound';

function App() {
  const authUser = useSelector(state => state.user.authUser);
  console.log('Authenticated:', authUser);
  const socket = useSelector(state => state.socket.socket); 
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (authUser && token) {
      const socketConnection = io('http://localhost:5000', {
        query: { uId: authUser?.id }, 
      });

      dispatch(setSocket(socketConnection));

      socketConnection.on('getOnlineUsers', (users) => {
        console.log('Online Users:', users);
        dispatch(setOnlineUsers(users));
      });

      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
          dispatch(setSocket(null)); 
        }
      };
    } else {
      // If the user is not authenticated, ensure any existing socket is disconnected
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]); 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/home" element={<UserProtected Component={Sidebar} />} />
          <Route path="/profile" element={<UserProtected Component={Profile} />} />
          <Route path="/editprofile" element={<UserProtected Component={EditProfile} />} />
          <Route path="/changepassword" element={<UserProtected Component={ChangePassword} />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
