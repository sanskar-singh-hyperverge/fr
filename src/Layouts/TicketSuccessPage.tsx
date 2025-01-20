import React from 'react';
import { Button, TicketCard } from 'movie-design-hv';
import { useNavigate, useLocation } from 'react-router-dom';

interface TicketDetails {
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

const TicketSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ticketDetails = location.state as TicketDetails;

  if (!ticketDetails) {
    navigate('/home');
    return null;
  }

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const formatTicketCount = (adult: number, child: number) => {
    const parts = [];
    if (adult > 0) parts.push(`${adult} Adult${adult > 1 ? 's' : ''}`);
    if (child > 0) parts.push(`${child} Child${child > 1 ? 'ren' : ''}`);
    return parts.join(', ');
  };

  return (
    <div className="relative min-h-screen bg-black p-4 flex flex-col">
      <h1 className="text-white text-2xl font-semibold mb-6 text-center">
        My Ticket
      </h1>

      <div className="flex flex-col items-center mb-8">
        <div className="w-64 h-64 bg-white p-4 rounded-lg mb-6">
          <img 
            src="/qr.png" 
            alt="QR Code"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-gray-300 text-center text-base px-4 mb-8">
          You can start enjoying the movie by scanning your ticket to the theater and canteen staff.
        </p>
      </div>

      <div className="mb-8">
        <TicketCard 
          movieName={ticketDetails.movieName}
          ticketCount={formatTicketCount(
            ticketDetails.ticketCount.adult,
            ticketDetails.ticketCount.child
          )}
          ticketPrice={ticketDetails.totalAmount}
          sessionTime={`${formatTime(ticketDetails.showTime.start)} - ${formatTime(ticketDetails.showTime.end)}`}
          seatNumbers={ticketDetails.seats}
          buffetProducts="None"
          buffetPrice={0}
          movieTheater={ticketDetails.theater}
          isPaymentSuccess={true}
        />
      </div>

      <div className="relative mt-auto pt-16">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent -mx-4" />
        
        <Button
          label="Back to Home"
          type="secondary"
          size="large"
          className="w-full h-14 bg-gray-900 hover:bg-gray-800 relative z-10 rounded-xl text-white border-0 shadow-lg"
          btnTextClassName="text-lg font-normal"
          onClick={() => navigate('/home')}
        />
      </div>
    </div>
  );
};

export default TicketSuccessPage;