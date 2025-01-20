import React, { useEffect } from 'react';
import { Stepper, Button } from 'movie-design-hv';
import { Check } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaymentSuccessState {
  bookingId: string;
  movieName: string;
  theater: string;
  seats: string[];
  showTime: {
    start: string;
    end: string;
  };
  totalAmount: number;
  ticketCount: {
    adult: number;
    child: number;
  };
}
const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state as PaymentSuccessState;

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/home');
    }
  }, [bookingDetails, navigate]);

  if (!bookingDetails) return null;

  return (
    <div className="min-h-screen bg-black relative flex flex-col">
      {/* Background Pattern Section */}
      <div 
        className="absolute top-0 left-0 w-full h-1/2 opacity-20"
        style={{
          backgroundImage: '/pay_suc_bg.png',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen p-4">
        {/* Stepper */}
        <div className="mb-12">
          <Stepper 
            currentStep={4} 
            totalStep={4}
            className="mx-16"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {/* Success Icon Circle */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
            <Check className="w-12 h-12 text-black" />
          </div>

          {/* Success Message */}
          <div className="mb-24">
            <h1 className="text-white text-3xl font-normal mb-4">
              Payment Successful
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-md mx-auto">
              We have sent a copy of your ticket to your e-mail address. You can check your ticket in the My Tickets section on the homepage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-4 max-w-md">
          <Button
            label="View Ticket"
            type="primary"
            size="large"
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700"
            btnTextClassName="text-lg"
            onClick={() => navigate('/success', { state: bookingDetails })}
          />
            <Button
              label="Back to Home"
              type="secondary"
              size="large"
              className="w-full h-14 bg-transparent hover:bg-gray-800"
              btnTextClassName="text-lg"
              onClick={() => navigate('/home')}
            />
          </div>
        </div>

        {/* Gradient Overlay at the bottom */}
        <div 
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;