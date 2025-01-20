import React, { useState, useEffect } from 'react';
import { SeatSelector, Counter, Button, Stepper, TicketCard } from 'movie-design-hv';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

interface LocationState {
  movieName: string;
  showTime: {
    start: string;
    end: string;
  };
  theater: string;
  adultPrice: number;
  childPrice: number;
  movieId: string;
}

interface SeatData {
  id: string;
  showSeatId: string;
  number: string;
  status: 'AVAILABLE' | 'BOOKED' | 'LOCKED';
}

interface ShowSeatsResponse {
  source: string;
  data: {
    layout: {
      rows: number;
      seatsPerRow: number;
    };
    seats: SeatData[];
  };
}

const BookingPage: React.FC = () => {
  const { id: showId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const showDetails = location.state as LocationState;

  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [seatLayout, setSeatLayout] = useState<{ rows: number; seatsPerRow: number } | null>(null);
  const [seatsData, setSeatsData] = useState<Record<string, "available" | "booked">>({});
  const [loading, setLoading] = useState(true);
  const [seatIdMap, setSeatIdMap] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If no showDetails, redirect back
    if (!showDetails) {
      navigate(-1);
      return;
    }

    const fetchShowSeats = async () => {
      if (!showId) return;

      try {
        const response = await axios.get<ShowSeatsResponse>(
          `http://localhost:3003/api/shows/${showId}/seats`
        );
        
        setSeatLayout(response.data.data.layout);

        // Create seat ID mapping and transform seats data
        const idMapping: Record<string, string> = {};
        const transformedSeats = response.data.data.seats.reduce((acc, seat) => {
          acc[seat.number] = seat.status === 'AVAILABLE' ? 'available' : 'booked';
          idMapping[seat.number] = seat.id;
          return acc;
        }, {} as Record<string, "available" | "booked">);

        setSeatIdMap(idMapping);
        setSeatsData(transformedSeats);
      } catch (error) {
        console.error('Error fetching seats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowSeats();
  }, [showId, showDetails, navigate]);

  useEffect(() => {
    if (showDetails) {
      const total = (adultCount * showDetails.adultPrice) + (childCount * showDetails.childPrice);
      setTotalAmount(total);
    }
  }, [adultCount, childCount, showDetails]);

  const maxSelections = adultCount + childCount;

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

  const handleSeatClick = (seats: any) => {
    if (Array.isArray(seats)) {
      setSelectedSeats(seats);
    }
  };

  const checkJobStatus = async (jobId: string, maxRetries = 5, interval = 1000): Promise<boolean> => {
    let retries = 0;
  
    while (retries < maxRetries) {
      try {
        const statusResponse = await axios.get(`http://localhost:3004/api/bookings/lock/${jobId}`);
        console.log('Job status:', statusResponse.data);
  
        // If we have a success or failure result, return it
        if (statusResponse.data.success === true) return true;
        if (statusResponse.data.success === false) return false;
  
        // If job is still active, wait and retry
        if (statusResponse.data.state === 'active') {
          await new Promise(resolve => setTimeout(resolve, interval));
          retries++;
          continue;
        }
  
        // If we get any other state, consider it a failure
        return false;
      } catch (error) {
        console.error('Error checking job status:', error);
        retries++;
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    }
  
    // If we exhausted all retries, return false
    return false;
  };
  
  const handlePaymentClick = async () => {
    try {
      const selectedSeatIds = selectedSeats.map(seatNumber => seatIdMap[seatNumber]);
      const isChildArray = Array(selectedSeats.length).fill(false);
      for (let i = adultCount; i < selectedSeats.length; i++) {
        isChildArray[i] = true;
      }
  
      // Start loading state
      setIsLoading(true);
  
      // Lock the seats first
      const lockResponse = await axios.post('http://localhost:3004/api/bookings/lock', {
        showId,
        seatIds: selectedSeatIds,
        userId: localStorage.getItem('userId'),
        isChild: isChildArray
      });
  
      if (!lockResponse.data.jobId) {
        throw new Error('No job ID received');
      }
  
      // Check the job status with retries
      const isSuccess = await checkJobStatus(lockResponse.data.jobId);
  
      if (isSuccess) {
        // Navigate to payment page with all necessary details
        navigate('/payment', {
          state: {
            showId,
            seatIds: selectedSeatIds,
            userId: localStorage.getItem('userId'),
            totalAmount,
            isChild: isChildArray,
            movieName: showDetails.movieName,
            theater: showDetails.theater,
            seats: selectedSeats,
            showTime: showDetails.showTime
          }
        });
      } else {
        alert("Unable to lock seats. Please try again.");
      }
    } catch (error) {
      console.error('Error locking seats:', error);
      alert("Error locking seats. Please try again.");
    } finally {
      // End loading state
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-black w-[393px] h-[852px] text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!seatLayout || !showDetails) {
    return (
      <div className="bg-black w-[393px] h-[852px] text-white flex items-center justify-center">
        <p>Error loading seat layout</p>
      </div>
    );
  }

  return (
    <div className="bg-black w-[393px] h-[852px] text-white">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Stepper currentStep={2} totalStep={4} className='w-60' />
          <div className="w-6" />
        </div>
      </div>

      {/* Screen SVG */}
      <div className="mt-4 text-center">
        <p className="mb-2">Screen</p>
        <div className="mx-4 relative">
          <svg viewBox="0 0 400 40" className="w-full h-10" preserveAspectRatio="none">
            {/* ... Screen SVG content ... */}
          </svg>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex-1">
          <SeatSelector
            rows={seatLayout.rows}
            seatsPerRow={seatLayout.seatsPerRow}
            maxSelections={maxSelections}
            gap={2}
            seatSize="28px"
            colors={{
              booked: "bg-gray-600",
              available: "bg-purple-500",
              selected: "bg-orange-500",
            }}
            availableSeats={seatsData}
            onClick={handleSeatClick as (seats: Iterable<any>) => void}
          />
        </div>
      </div>

      <div className="px-4 mt-6">
        <p className="text-base mb-4">• Ticket Details</p>
        <div className="flex justify-between items-center">
          <Counter
            initialValue={2}
            minValue={0}
            maxValue={10}
            orientation="horizontal"
            label="Adult"
            onChange={handleAdultCountChange}
            customSize={{ width: "160", height: "48" }}
          />
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

      <div className="px-4 mt-6">
        <TicketCard
          movieName={showDetails.movieName}
          ticketCount={`${adultCount} Adult${adultCount > 1 ? 's' : ''}${childCount ? `, ${childCount} Child${childCount > 1 ? 'ren' : ''}` : ''}`}
          ticketPrice={totalAmount}
          sessionTime={`${new Date(showDetails.showTime.start).toLocaleTimeString()} - ${new Date(showDetails.showTime.end).toLocaleTimeString()}`}
          seatNumbers={selectedSeats}
          buffetProducts="None"
          buffetPrice={0}
          movieTheater={showDetails.theater}
          isPaymentSuccess={false}
        />
      </div>

      <div className="px-4 mt-4">
      <Button
        label="Payment Options"
        type="primary"
        size="base"
        isDisabled={isLoading || selectedSeats.length === 0 || selectedSeats.length !== (adultCount + childCount)}
        onClick={handlePaymentClick}
        children={
          isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )
        }
      />
      </div>
    </div>
  );
};

export default BookingPage;