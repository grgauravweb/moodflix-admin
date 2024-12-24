import React from 'react'
import { useAuth } from '../../auth/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom';

const AdminNav = () => {

    const { user, logout } = useAuth(); // Get user and logout function
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(); // Call logout function
      navigate('/'); // Redirect to login page
    };



  return (
    <nav className="fixed w-full bg-gray-900 p-4 text-white flex justify-between items-center shadow-md z-10">
    <h1 className="text-xl">Admin Dashboard</h1>
    <div>
      <span className="mr-4">Welcome, {user.email}</span>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  </nav>
  )
}

export default AdminNav
