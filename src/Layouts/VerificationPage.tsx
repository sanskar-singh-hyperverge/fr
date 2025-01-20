import React, { useState } from 'react';
import { Input, Button, HomeHero } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    navigate('/home');
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="relative w-full h-[850px] max-w-[400px] mx-auto overflow-hidden">
      {/* Background with HomeHero */}
      <div className="absolute inset-0">
        <HomeHero 
          logoClassName="h-12"
          className="w-full h-full"
          backgroundImage="/bgImage.jpg"
          logoImage="/Group 3.png"
          overlayColor="rgba(0, 0, 0, 0.7)"
          overlayOpacity={0.4}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col px-8">
        {/* Header */}
        <div className="text-gray-400 text-lg pt-6 pb-4">
          Verification
        </div>

        {/* Form Container */}
        <div className="relative flex flex-col items-center pt-64 mt-60"> {/* Adjusted padding-top */}
          {/* Form */}
          <div className="w-full space-y-6">
            <Input
              type="text"
              value={email}
              placeholder="OTP"
              onChange={(value) => setEmail(value)}
              required
              className="w-full bg-gray-800/50 border-0 rounded-lg h-12 text-white placeholder-gray-500"
              // wrapperClassName="w-full"
            />

            <Button
              label="Sign Up"
              type="primary"
              size="large"
              onClick={handleSignIn}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-lg mt-8"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default VerificationPage;