import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          💸 Expense Splitter
        </Link>
        {token && (
          <div className="flex gap-4">
            <Link to="/" className="hover:text-gray-200">Dashboard</Link>
            <Link to="/add-expense" className="hover:text-gray-200">Add Expense</Link>
            <Link to="/friends" className="hover:text-gray-200">Friends</Link>
            <Link to="/settlements" className="hover:text-gray-200">Settlements</Link>
            <Link to="/profile" className="hover:text-gray-200">Profile</Link>
            <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};
