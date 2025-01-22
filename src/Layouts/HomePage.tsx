import React, { useEffect, useState } from 'react';
import { Caraousel, CardSlider } from 'movie-design-hv';
import { Home, Heart, Ticket, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Movie {
  id: string;
  title: string;
  description: string;
  duration: number;
  release_date: string;
  poster_url: string;
  trailer_url: string;
  imdb_rating: number;
  app_rating: number;
  status: 'UPCOMING' | 'NOW_SHOWING' | 'HIGHLIGHTS';
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  source: string;
  data: Movie[];
}

interface CarouselSlide {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

interface CardData {
  image: string;
  title: string;
  description: string;
  card_id: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [highlightMovies, setHighlightMovies] = useState<Movie[]>([]);
  const [nowShowingMovies, setNowShowingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const fetchMoviesByStatus = async (status: string, limit = 3): Promise<Movie[]> => {
    try {
      const response = await axios.get<ApiResponse>(`http://localhost:3002/api/movies/status/${status}?page=1&limit=${limit}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${status} movies:`, error);
      return [];
    }
  };

  const truncateText = (text: string): string => {
    return text.length > 10 ? `${text.substring(0, 10)}...` : text;
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      const highlights = await fetchMoviesByStatus('HIGHLIGHTS');
      const nowShowing = await fetchMoviesByStatus('NOW_SHOWING');
      const upcoming = await fetchMoviesByStatus('UPCOMING');
      
      setHighlightMovies(highlights);
      setNowShowingMovies(nowShowing);
      setUpcomingMovies(upcoming);
    };

    fetchAllMovies();
  }, []);

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const carouselSlides: CarouselSlide[] = highlightMovies.map(movie => ({
    image: "/casino.webp",
    title: movie.title,
    description: truncateText(movie.description),
    onClick: () => handleMovieClick(movie.id)
  }));

  const nowPlayingCards: CardData[] = nowShowingMovies.map(movie => ({
    image: "/images_1.webp",
    title: movie.title,
    description: truncateText(movie.description),
    card_id: movie.id
  }));

  const comingSoonCards: CardData[] = upcomingMovies.map(movie => ({
    image: "/images_1.webp",
    title: movie.title,
    description: truncateText(movie.description),
    card_id: movie.id
  }));

  const handleCardClick = (card_id: string) => {
    navigate(`/movie/${card_id}`);
  };

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
          <div className="w-full aspect-[16/9] rounded-lg overflow-hidden">
            <Caraousel
              slides={carouselSlides}
              interval={3000}
              width='100%'
              height='200px'
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
              onClick={(index: number) => handleCardClick(nowPlayingCards[index].card_id)}
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
              onClick={(index: number) => handleCardClick(comingSoonCards[index].card_id)}
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