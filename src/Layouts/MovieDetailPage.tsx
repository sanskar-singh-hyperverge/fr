import React, { useEffect, useState } from 'react';
import { CardSlider, HeroSection, Button } from 'movie-design-hv';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface MovieDetails {
  id: string;
  title: string;
  description: string;
  duration: number;
  release_date: string;
  poster_url: string;
  trailer_url: string;
  imdb_rating: number;
  app_rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  source: string;
  data: MovieDetails;
}

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get<ApiResponse>(`http://localhost:3002/api/movies/${id}`);
        setMovieDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="w-full h-screen max-w-md mx-auto bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!movieDetails) {
    return <div className="w-full h-screen max-w-md mx-auto bg-black flex items-center justify-center">
      <div className="text-white">Movie not found</div>
    </div>;
  }

  const movieData = {
    title: movieDetails.title,
    studio: "Studio",
    rating: movieDetails.imdb_rating,
    userRating: movieDetails.app_rating,
    videoUrl: "/videoplayback.mp4",
    posterUrl: "/image_shifu.png",
    onBackButtonClick: () => navigate('/home')
  };

  const movieImages = [
    { 
      image: "https://picsum.photos/400/300",
      title: "Scene 1",
      description: "Movie Scene"
    },
    { 
      image: "https://picsum.photos/300/300",
      title: "Scene 2",
      description: "Movie Scene"
    },
    { 
      image: "https://picsum.photos/300/400",
      title: "Scene 3",
      description: "Movie Scene"
    }
  ];

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-black overflow-y-auto">
      <HeroSection {...movieData} />
      
      <div className="px-4 py-6">
        <div className="mb-8">
          <h2 className="text-white text-xl font-medium mb-3">
            • Movie Subject
          </h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            {movieDetails.description}
          </p>
          <button className="text-purple-500 text-sm">See All</button>
        </div>

        <div className="mb-24">
          <h2 className="text-white text-xl font-medium mb-3">
            • Images From the Movie
          </h2>
          <div className="rounded-lg overflow-hidden">
            <CardSlider
              cardsData={movieImages}
              cardWidth="280px"
              cardHeight="160px"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent max-w-md mx-auto">
        <Button 
          label="Buy Ticket Now"
          type="primary"
          size="large"
          rounded
          className="w-full"
          btnTextClassName="text-lg font-medium"
          onClick={() => navigate(`/buy_ticket/${id}`)}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;