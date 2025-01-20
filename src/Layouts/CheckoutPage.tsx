import React, { useState } from 'react';
import { Button, Selector, SlideShow, Stepper } from 'movie-design-hv';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Slide {
  imageUrl: string;
}

const CheckoutPage: React.FC = () => {
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  const theaters: string[] = [
    'Miraj Cinemas - Mumbai',
    'PVR Cinemas - Bangalore',
    'INOX Cinemas - Delhi'
  ];

  const times: string[] = [
    'JAN 12, 2025 - 20:30 pm',
    'JAN 12, 2025 - 22:30 pm',
    'JAN 13, 2025 - 18:30 pm'
  ];

  const slides: Slide[] = [
    {
      imageUrl: "https://picsum.photos/400/300"
    },
    {
      imageUrl: "https://picsum.photos/300/300"
    },
    {
      imageUrl: "https://picsum.photos/300/400"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="sticky top-0 z-10 bg-black">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
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
          name="Kung Fu Panda 4"
          subName="DreamWorks Animation"
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
            options={theaters}
            placeholder="Select Theatre *"
            selected={selectedTheater}
            onSelect={setSelectedTheater}
            customSize={{ width: "100%", height: "56px" }}
          />

          <Selector
            options={times}
            placeholder="Select Time *"
            selected={selectedTime}
            onSelect={setSelectedTime}
            customSize={{ width: "100%", height: "56px" }}
          />

          <Selector
            options={[]}
            placeholder="Buffet Products"
            selected={null}
            onSelect={setSelectedTime}
            customSize={{ width: "100%", height: "56px" }}
          />
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
          onClick={() => navigate('/buffet_page')}
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