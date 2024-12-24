import React, { useState } from 'react';
import logo from "../assets/logo.png";
import ForgetPassword from './ForgetPassword';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../Apis/Globalapi';

const Login = () => {
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth(); // Get login function from context
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowForgetPassword(!showForgetPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URLS.login, { email, password });
      console.log('Login successful:', response.data);
      login(response.data.token); // Call login function with token
      navigate('/admin'); 
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <div className="p-8 rounded-full max-w-sm w-full">
          <img className='rounded-full' src={logo} alt="logo" />
        </div>

        <div className={`flip-container ${showForgetPassword ? 'flipped' : ''}`}>
          <div className="flip-card">
            <div className="flip-front bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button type="button" onClick={handleToggle} className="text-sm text-blue-500 hover:text-blue-700">
                    Forgot Password?
                  </button>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>

            <div className="flip-back bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <ForgetPassword handleBack={handleToggle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
