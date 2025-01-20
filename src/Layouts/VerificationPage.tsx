import React, { useState } from 'react';
import { Input, Button, HomeHero } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Get email stored in localStorage from SignUp step
  const email = localStorage.getItem('signupEmail') || '';

  const handleVerification = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/api/auth/verify', {
        email,
        otp,
      });

      if (response.status === 200) {
        alert('Verification successful! You can now sign in.');
        navigate('/sign_in');
      }
    } catch (error) {
      console.error('Error verifying OTP:');
      alert('Invalid OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[850px] max-w-[400px] mx-auto overflow-hidden">
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

      <div className="relative z-20 w-full h-full flex flex-col px-8">
        <div className="text-gray-400 text-lg pt-6 pb-4">
          Verification
        </div>

        <div className="relative flex flex-col items-center pt-64 mt-60">
          <div className="w-full space-y-6">
            <Input
              type="text"
              value={otp}
              placeholder="Enter OTP"
              onChange={(value) => setOtp(value)}
              required
              className="w-full bg-gray-800/50 border-0 rounded-lg h-12 text-white placeholder-gray-500"
            />

            <Button
              label={loading ? "Verifying..." : "Verify"}
              type="primary"
              size="large"
              onClick={handleVerification}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-lg mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
