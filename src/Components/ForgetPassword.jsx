import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { API_URLS } from '../Apis/Globalapi';


const ForgetPassword = ({ handleBack }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URLS.Forget}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    newPassword,
                    secretKey: parseInt(secretKey)  // Convert secretKey to integer
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Password reset successfully');
            } else {
                alert(data.message || 'Failed to reset password');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {/* Back Arrow Button and Title */}
            <div className="relative flex items-center justify-center mb-6">
                <button
                    onClick={handleBack}
                    className="absolute left-0 text-gray-700 hover:text-blue-500"
                >
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold">Reset Password</h1>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Email Field */}
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
                        required
                    />
                </div>

                {/* New Password Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your new password"
                        required
                    />
                </div>

                {/* Secret Key Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secret-key">
                        Secret Key
                    </label>
                    <input
                        type="number"
                        id="secret-key"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your secret key"
                        required
                    />
                </div>

                {/* Reset Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;
