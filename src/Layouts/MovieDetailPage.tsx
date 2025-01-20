import React from 'react';
import { CardSlider,HeroSection, Button } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

const MovieDetailPage = () => {
    const navigate = useNavigate();
  const movieData = {
    title: "Kung Fu Panda 4",
    studio: "DreamWorks Animation",
    rating: 8.1,
    userRating: 4,
    videoUrl: "/videoplayback.mp4",
    posterUrl: "/image_shifu.png",
    onBackButtonClick: () => navigate('/home')
  };

  const movieImages = [
    { 
      image: "https://picsum.photos/400/300",
      title: "Scene 1",
      description: "Po and friends"
    },
    { 
      image: "https://picsum.photos/300/300",
      title: "Scene 2",
      description: "Valley of Peace"
    },
    { 
      image: "https://picsum.photos/300/400",
      title: "Scene 3",
      description: "Epic battle"
    }
  ];

  return (
    <div className="w-full h-screen max-w-md mx-auto bg-black overflow-y-auto">
      <HeroSection {...movieData} />
      
      <div className="px-4 py-6">
        {/* Movie Subject Section */}
        <div className="mb-8">
          <h2 className="text-white text-xl font-medium mb-3">
            • Movie Subject
          </h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            After Po is tapped to become the Spiritual Leader of the Valley of Peace, 
            he needs to find and train a new Dragon Warrior, while a wicked sorceress 
            plans to re-summon all the master villains whom Po has vanquished to the spirit realm...
          </p>
          <button className="text-purple-500 text-sm">See All</button>
        </div>

        {/* Images Section */}
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

      {/* Fixed Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent max-w-md mx-auto">
        <Button 
          label="Buy Ticket Now"
          type="primary"
          size="large"
          rounded
          className="w-full"
          btnTextClassName="text-lg font-medium"
          onClick={() => navigate('/buy_ticket')}
        />
      </div>
    </div>
  );
};

export default MovieDetailPage;