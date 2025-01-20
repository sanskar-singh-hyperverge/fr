import React, { useState, useEffect } from 'react';
import { SeatSelector, Counter, Button, Stepper,TicketCard } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';
// import TicketCard from '../components/TicketCard';

const BookingPage: React.FC = () => {
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  const maxSelections = adultCount + childCount;

  useEffect(() => {
    const total = (adultCount * 20) + (childCount * 15);
    setTotalAmount(total);
  }, [adultCount, childCount]);

  const handleSeatSelect = (seats: string[]) => {
    if (seats.length <= maxSelections) {
      setSelectedSeats(seats);
    }
  };

  const handleAdultCountChange = (value: number) => {
    const newAdultCount = value;
    if (newAdultCount + childCount < selectedSeats.length) {
      setSelectedSeats(selectedSeats.slice(0, newAdultCount + childCount));
    }
    setAdultCount(newAdultCount);
  };

  const handleChildCountChange = (value: number) => {
    const newChildCount = value;
    if (adultCount + newChildCount < selectedSeats.length) {
      setSelectedSeats(selectedSeats.slice(0, adultCount + newChildCount));
    }
    setChildCount(newChildCount);
  };

  const mainSeatsData: Record<string, "available" | "booked"> = {
    R1S1: "available", R1S2: "available", R1S3: "booked", R1S4: "available", R1S5: "available", R1S6: "available",
    R2S1: "booked", R2S2: "available", R2S3: "available", R2S4: "booked", R2S5: "available", R2S6: "available",
    R3S1: "available", R3S2: "booked", R3S3: "available", R3S4: "available", R3S5: "booked", R3S6: "booked",
    R4S1: "available", R4S2: "available", R4S3: "available", R4S4: "available", R4S5: "booked", R4S6: "available",
    R5S1: "booked", R5S2: "available", R5S3: "available", R5S4: "available", R5S5: "available", R5S6: "available"
  };

  const sideSeatsData: Record<string, "available" | "booked"> = {
    R1S1: "available", R1S2: "available",
    R2S1: "booked", R2S2: "available",
    R3S1: "available", R3S2: "booked",
    R4S1: "available", R4S2: "available",
    R5S1: "available", R5S2: "booked"
  };

  return (
    <div className="bg-black w-[393px] h-[852px] text-white">
      {/* Header */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Stepper 
            currentStep={2} 
            totalStep={4} 
            className='w-60'
            />
          <div className="w-6" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="mb-2">Screen</p>
        <div className="mx-4 relative">
          <svg
            viewBox="0 0 400 40"
            className="w-full h-10"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className="stop-white/40" />
                <stop offset="50%" className="stop-white" />
                <stop offset="100%" className="stop-white/40" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 0,35 
                 Q 200,5 400,35"
              fill="none"
              stroke="url(#screenGradient)"
              strokeWidth="4"
              filter="url(#glow)"
              className="stroke-white/30"
            />
          </svg>
        </div>
      </div>

      <div className="px-4 mt-6 flex justify-between items-start gap-4">
        <div className="flex-1">
          <SeatSelector
            rows={5}
            seatsPerRow={6}
            maxSelections={maxSelections}
            gap={2}
            seatSize="28px"
            colors={{
              booked: "bg-gray-600",
              available: "bg-purple-500",
              selected: "bg-orange-500",
            }}
            availableSeats={mainSeatsData}
          />
        </div>

        <div className="flex-shrink-0 mr-5">
          <SeatSelector
            rows={5}
            seatsPerRow={2}
            maxSelections={maxSelections}
            gap={2}
            seatSize="28px"
            colors={{
              booked: "bg-gray-600",
              available: "bg-purple-500",
              selected: "bg-orange-500",
            }}
            availableSeats={sideSeatsData}
          />
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-base mb-4">• Ticket Details</p>
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-4 mt-2">
              <Counter
                initialValue={2}
                minValue={0}
                maxValue={10}
                orientation="horizontal"
                label="Adult"
                onChange={handleAdultCountChange}
                customSize={{ width: "160", height: "48" }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4 mt-2">
              <Counter
                initialValue={0}
                minValue={0}
                label="Child"
                maxValue={10}
                orientation="horizontal"
                onChange={handleChildCountChange}
                customSize={{ width: "160", height: "48" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <TicketCard
          movieName="Kung Fu Panda 4"
          ticketCount={`${adultCount} Adult${adultCount > 1 ? 's' : ''}${childCount ? `, ${childCount} Child${childCount > 1 ? 'ren' : ''}` : ''}`}
          ticketPrice={totalAmount}
          sessionTime="20.30 pm - 22.00 pm"
          seatNumbers={selectedSeats}
          buffetProducts="None"
          buffetPrice={0}
          movieTheater="Cinema Village"
          isPaymentSuccess={false}
        />
      </div>

      <div className="px-4 mt-4">
        <Button
          label="Payment Options"
          type="primary"
          size="base"
          isDisabled={false}
          onClick={() => navigate('/payment')}
          children={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default BookingPage;