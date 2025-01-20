import React, { useState, useEffect } from 'react';
import { Button, Selector, SlideShow, Stepper } from 'movie-design-hv';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Theater {
  id: string;
  name: string;
  location: string;
}

interface Show {
  id: string;
  movie_id: string;
  theater_id: string;
  screen_id: string;
  screen_number: number;
  adult_price: number;
  child_price: number;
  start_time: string;
  end_time: string;
}

interface Slide {
  imageUrl: string;
}

const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [movieDetails, setMovieDetails] = useState<any>(null);

  // Generate display strings for theaters
  const theaterOptions = theaters.map(theater => 
    `${theater.name} - ${theater.location}`
  );

  // Create a map for looking up theater IDs
  const theaterMap = theaters.reduce((acc, theater) => {
    acc[`${theater.name} - ${theater.location}`] = theater.id;
    return acc;
  }, {} as Record<string, string>);

  // Generate display strings for shows
  const showOptions = shows.map(show => {
    const startDate = new Date(show.start_time);
    return `${startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })} - ${startDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })}`;
  });

  // Create a map for looking up show IDs
  const showMap = shows.reduce((acc, show) => {
    const startDate = new Date(show.start_time);
    const displayString = `${startDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    })} - ${startDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })}`;
    acc[displayString] = show.id;
    return acc;
  }, {} as Record<string, string>);

  // Fetch theaters for the movie
  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/movies/${id}/theaters`);
        setTheaters(response.data.data);
      } catch (error) {
        console.error('Error fetching theaters:', error);
      }
    };

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/movies/${id}`);
        setMovieDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    
    if (id) {
      fetchTheaters();
      fetchMovieDetails();
    }
  }, [id]);

  // Fetch shows when theater is selected
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/api/movies/${id}/theaters/${selectedTheater}/shows`
        );
        setShows(response.data.data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    if (selectedTheater) {
      fetchShows();
      setSelectedTime(null);
      setSelectedShow(null);
    }
  }, [id, selectedTheater]);

  const slides: Slide[] = [
    { imageUrl: "https://picsum.photos/400/300" },
    { imageUrl: "https://picsum.photos/300/300" },
    { imageUrl: "https://picsum.photos/300/400" }
  ];

  const handleTheaterSelect = (theaterString: string) => {
    const theaterId = theaterMap[theaterString];
    setSelectedTheater(theaterId);
  };

  const handleTimeSelect = (timeString: string) => {
    const showId = showMap[timeString];
    setSelectedTime(timeString);
    setSelectedShow(shows.find(show => show.id === showId) || null);
  };

  const handleNextClick = () => {
    if (selectedShow) {
      navigate(`/ticket_details/${selectedShow.id}`, {
        state: {
          movieName: movieDetails?.title,
          showTime: {
            start: selectedShow.start_time,
            end: selectedShow.end_time
          },
          theater: selectedTheater ? theaters.find(t => t.id === selectedTheater)?.name : '',
          adultPrice: selectedShow.adult_price,
          childPrice: selectedShow.child_price,
          movieId: movieDetails?.id
        }
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="sticky top-0 z-10 bg-black">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-6 h-6 text-black" />
          </button>
          <Stepper 
            currentStep={1} 
            totalStep={4}
            className="w-1/3 mr-28"
          />
        </div>
      </div>

      <div className="px-6 pt-4 pb-24 space-y-6">
        <SlideShow
          slides={slides}
          name={movieDetails?.title || "Loading..."}
          subName="Movie Theater"
          autoSlide={false}
          className="w-full"
          borderRadius="16px"
          nameclassName="text-xl font-semibold"
          subclassName="text-gray-400 text-sm"
          arrowImage="/api/placeholder/24/24"
        />

        <p className="text-gray-400 text-sm">
          You need to select the mandatory fields (*) to proceed to the checkout page.
        </p>

        <div className="space-y-4">
          <Selector
            options={theaterOptions}
            placeholder="Select Theatre *"
            selected={selectedTheater ? `${theaters.find(t => t.id === selectedTheater)?.name} - ${theaters.find(t => t.id === selectedTheater)?.location}` : undefined}
            onSelect={handleTheaterSelect}
            customSize={{ width: "100%", height: "56px" }}
          />

          <Selector
            options={showOptions}
            placeholder="Select Time *"
            selected={selectedTime!}
            onSelect={handleTimeSelect}
            customSize={{ width: "100%", height: "56px" }}
          />
          <div onClick={() => { navigate('/buffet_page') }}>
            <Selector
              options={[]}
              placeholder="Buffet Products"
              selected={null}
              onSelect={() => {}}
              customSize={{ width: "100%", height: "56px" }}
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-sm">
        <Button
          label="Next"
          type="primary"
          size="base"
          isDisabled={!selectedTheater || !selectedTime}
          rounded
          className="w-full"
          onClick={handleNextClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;