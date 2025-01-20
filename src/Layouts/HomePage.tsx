import React, { useEffect, useState } from 'react';
import { Caraousel, CardSlider } from 'movie-design-hv';
import { Home, Heart, Ticket, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMoviesByStatus } from '../api/api';
import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [highlighMovies, setHighlighMovies] = useState([]);


  const carouselSlides = [
    {
      image: "https://picsum.photos/300/400",
      title: "Kung Fu Panda 4",
      description: "The Dragon Warrior returns",
      onclick: () => navigate('/movie_dets')
    },
    {
      image: "https://picsum.photos/400/300",
      title: "Godzilla X Kong",
      description: "Two legends collide",
      onclick: () => navigate('/index')
    },
    {
      image: "https://picsum.photos/400/400",
      title: "Godzilla X Kong",
      description: "Two legends collide"
    }
  ];

  const nowPlayingCards = [
    {
      image: "https://picsum.photos/100/400",
      title: "Back to Black",
      description: "Her music. Her life. Her terms.",
      onclick: () => navigate('/index')
    },
    {
      image: "https://picsum.photos/400/200",
      title: "Challengers",
      description: "Game. Set. Love.",
      // onclick: () => navigate('/movie_dets')
    },
    {
      image: "https://picsum.photos/200/300",
      title: "Civil War",
      description: "America divided",
      onclick: () => navigate('/index')
    }
  ];

  const comingSoonCards = [
    {
      image: "https://picsum.photos/400/300",
      title: "Kingdom of the Planet of the Apes",
      description: "A new reign begins"
    },
    {
      image: "https://picsum.photos/400/400",
      title: "IF",
      description: "Imagine that"
    },
    {
      image: "https://picsum.photos/300/400",
      title: "The Fall Guy",
      description: "From stuntman to hero"
    }
  ];

  const handleCarouselClick = () => {
    // navigate('/movie_dets');
  }

  useEffect(() => {
    const fetchMoviesHighlights = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/movies/status/UPCOMING');
        console.log(response);
        setHighlighMovies(response.data);
        carouselSlides.map((obj) => {
          
        })
        if (response.status === 200) {
          console.log(response.data);
        } else {
          console.log("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchMoviesHighlights(); // Correct way to call the function
  
  }, []);

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-black relative">
      <div className="fixed top-0 left-0 right-0 z-10 bg-black max-w-md mx-auto">
        <div className="flex justify-between items-center px-4 py-3">
          <User size={24} className="text-blue-400" />
          <span className="text-white font-semibold text-lg">FIGMA MOVIE</span>
          <Bell size={24} className="text-purple-500" />
        </div>
      </div>

      <div className="pt-14 pb-20 h-full overflow-y-auto">
        <div className="px-4 mb-8">
          <h2 className="text-white text-xl font-semibold mb-3">Highlights</h2>
          <div 
            className="w-full aspect-[16/9] rounded-lg overflow-hidden"
            // onClick={handleCarouselClick}
            >
            <Caraousel
              slides={carouselSlides}
              interval={3000}
              width='100%'
              height='100%'
              // onClick= {() => navigate('/movie_dets')}
            />
          </div>
        </div>

        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">New Movies In Theaters</h2>
            <span className="text-purple-500 text-sm">See All</span>
          </div>
          <div className="overflow-x-auto">
            <CardSlider
              cardsData={nowPlayingCards}
              cardWidth="140px"
              cardHeight="200px"
            />
          </div>
        </div>

        <div className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Coming Soon</h2>
            <span className="text-purple-500 text-sm">See All</span>
          </div>
          <div className="overflow-x-auto">
            <CardSlider
              cardsData={comingSoonCards}
              cardWidth="140px"
              cardHeight="200px"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-gray-800/50 max-w-md mx-auto rounded-t-3xl">
        <div className="flex justify-around items-center h-16 px-6">
          <Heart size={24} className="text-gray-400" />
          <div className="bg-purple-500 p-3 rounded-full">
            <Home size={24} className="text-white" />
          </div>
          <Ticket size={24} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;