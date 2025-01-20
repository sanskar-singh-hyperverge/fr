import React from 'react';
import { Button, Icon, Stepper, PaymentMethod, Footer } from 'movie-design-hv';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface PaymentState {
  showId: string;
  seatIds: string[];
  userId: string;
  totalAmount: number;
  isChild: boolean[];
  movieName: string;
  theater: string;
  seats: string[];
  showTime: {
    start: string;
    end: string;
  };
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentDetails = location.state as PaymentState;

  const paymentMethods = [
    {
      text: 'Pay with Apple Pay',
      imageUrl: '/apple.png',
      backgroundColor: 'linear-gradient(90deg, #000000, #FFFFFF)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with Master Card',
      imageUrl: '/mastercard.png',
      backgroundColor: 'linear-gradient(100deg, #ED0006, #FF5E00)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with PayPal',
      imageUrl: '/apple.png',
      backgroundColor: 'linear-gradient(100deg, #253B80, #179BD7)',
      borderRadius: '8px',
    },
    {
      text: 'Pay with Google Pay',
      imageUrl: '/mastercard.png',
      backgroundColor: 'linear-gradient(100deg, #EA4335 0%, #FBBC04 34%, #34A853 67%, #4285F4 100%)',
      borderRadius: '8px',
    },
  ];

  const handlePayment = async () => {
    try {
      // Confirm the booking
      const response = await axios.post('http://localhost:3004/api/bookings', {
        showId: paymentDetails.showId,
        seatIds: paymentDetails.seatIds,
        userId: paymentDetails.userId,
        isChild: paymentDetails.isChild
      });

      if (response.data.bookingId) {
        const childCount = paymentDetails.isChild.filter(isChild => isChild).length;
        const adultCount = paymentDetails.isChild.filter(isChild => !isChild).length;
        navigate('/payment_success', {
            state: {
              bookingId: response.data.bookingId,
              movieName: paymentDetails.movieName,
              theater: paymentDetails.theater,
              seats: paymentDetails.seats,
              showTime: paymentDetails.showTime,
              totalAmount: paymentDetails.totalAmount,
              ticketCount: {
                adult: adultCount,
                child: childCount
              }
            }
          });
        } else {
          navigate('/payment_failed');
        }
    } catch (error) {
      console.error('Payment error:', error);
      try {
        await axios.post('http://localhost:3004/api/bookings/release', {
          showId: paymentDetails.showId,
          seatIds: paymentDetails.seatIds
        });
      } catch (releaseError) {
        console.error('Error releasing seats:', releaseError);
      }
      navigate('/payment_failed');
    }
  };

  if (!paymentDetails) {
    navigate(-1);
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-5 relative">
      <div className="absolute top-4 left-4">
        <Icon
          URL="/Vector.png"
          iconColor="white"
          bgColor='white'
          iconBorderClr="transparent"
          rounded="rounded-2xl"
          className="cursor-pointer h-fit"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="grid w-[50%] h-[5%] max-w-fit max-w-screen-md gap-x-8">
        <Stepper currentStep={3} totalStep={4} />
      </div>

      <div className="mb-7 w-full p-4 rounded-lg mt-4">
        <h2 className="text-md font-normal opacity-[50%] mb-4">Select Payment Options</h2>
        {paymentMethods.map((method, index) => (
          <PaymentMethod
            key={index}
            className="mb-6 h-4/5"
            textClassName="text-white font-normal"
            imageClassName="w-13 h-102 rounded-md"
            {...method}
          />
        ))}
      </div>

      <div className="w-full max-w-md absolute z-100 bottom-4 mt-2">
        <Footer className="w-full flex flex-col items-center justify-around gap-5">
          <div className="flex flex-col items-center justify-center gap">
            <h3 className="text-sm font-semibold text-white underline-offset-5">Total Amount</h3>
            <p className="text-4xl font-bold text-green-700 text-[36px]">
              ${paymentDetails.totalAmount}
            </p>
          </div>
          <Button 
            label="Pay Now" 
            type="primary" 
            className="w-full text-white py-2 px-4 rounded-lg font-bold text-lg"
            onClick={handlePayment}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </Footer>
      </div>
    </div>
  );
};

export default PaymentPage;