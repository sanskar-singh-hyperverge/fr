import React from 'react';
import { Button, TicketCard } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

interface TicketInfoProps {
  movieName: string;
  ticketCount: number;
  ticketPrice: number;
  sessionTime: string;
  seatNumbers: string;
  buffetProducts?: string;
  buffetPrice?: number;
  movieTheater: string;
  isPaymentSuccess?: boolean;
}

const TicketSuccessPage = () => {
  const navigate = useNavigate();
  const ticketInfo = {
    movieName: "Kung Fu Panda 4",
    ticketCount: 2,
    ticketPrice: 40,
    sessionTime: "20:30 pm - 22:00 pm",
    seatNumbers: ["C3, C4"],
    buffetProducts: "None",
    buffetPrice: 0,
    movieTheater: "Cinema Village",
    isPaymentSuccess: true
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
          movieName="Kung Fu Panda 4"
          ticketCount="2"
          ticketPrice={40}
          sessionTime="20:30 pm - 22:00 pm"
          seatNumbers={["c3", "c4"]}
          buffetProducts="None"
          buffetPrice={0}
          movieTheater="Cinema Village"
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