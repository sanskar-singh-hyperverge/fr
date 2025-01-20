import React from 'react';
import { Stepper, Button } from 'movie-design-hv';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black p-4 flex flex-col">
      <div className="mb-12">
        <Stepper 
          currentStep={4} 
          totalStep={4}
          className="mx-16"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6">
          <X className="w-12 h-12 text-black" />
        </div>

        <div className="mb-24">
          <h1 className="text-white text-3xl font-semibold mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            Your ticket purchase could not be processed because there was a problem with the payment process. Try to buy a ticket again by pressing the try again button.
          </p>
        </div>

        <div className="w-full space-y-4 max-w-md">
          <Button
            label="Try Again"
            type="primary"
            size="large"
            rounded
            className="w-full"
            onClick={() => navigate('/payment_success')}
          />
          <Button
            label="Back to Home"
            type="secondary"
            size="large"
            rounded
            className="w-full"
            onClick={() => navigate('/home')}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;