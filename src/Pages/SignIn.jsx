import React from 'react';
import Login from '../Components/Login';

const SignIn = () => {
  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url('https://uhdwallpapers.org/uploads/converted/20/06/25/macos-big-sur-wwdc-2560x1440_785884-mm-90.jpg')` }}>
      <Login />
    </div>
  );
};

export default SignIn;
