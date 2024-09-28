import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProtected({ Component }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if token is not found
    }
  }, [token, navigate]); // Run this effect whenever the token or navigate changes

  return (
    <div>
      {token ? <Component /> : null} {/* Render the component only if token exists */}
    </div>
  );
}
