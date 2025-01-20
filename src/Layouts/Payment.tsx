import React from 'react'
import {Button} from 'movie-design-hv';

import { Icon, Stepper, PaymentMethod, Footer } from 'movie-design-hv';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const paymentMethods = [
        {
        text: 'Pay with Apple Pay',
        imageUrl: '/apple.png',
        backgroundColor: 'linear-gradient(90deg, #000000, #FFFFFF)',
        borderRadius: '8px',
        },
        {
        text: 'Pay with Master Card',
        imageUrl: '/mastercard.png',
        backgroundColor: 'linear-gradient(100deg, #ED0006, #FF5E00)',
        borderRadius: '8px',
        },
        {
        text: 'Pay with PayPal',
        imageUrl: '/apple.png',
        backgroundColor: 'linear-gradient(100deg, #253B80, #179BD7)',
        borderRadius: '8px',
        },
        {
        text: 'Pay with Google Pay',
        imageUrl: '/mastercard.png',
        backgroundColor: 'linear-gradient(100deg, #EA4335 0%, #FBBC04 34%, #34A853 67%, #4285F4 100%)',
        borderRadius: '8px',
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center p-5 relative">
        {/* Back Icon */}
        <div className="absolute top-4 left-4">
            <Icon
            URL="/Vector.png"
            iconColor="white"
            bgColor='white'
            iconBorderClr="transparent"
            rounded="rounded-2xl"
            className="cursor-pointer h-fit "
            onClick={() => window.history.back()}
            />
        </div>

        <div className="grid w-[50%] h-[5%] max-w-fit max-w-screen-md gap-x-8">
            <Stepper currentStep={3} totalStep={4} />
        </div>

        <div className="mb-7 w-full  p-4 rounded-lg mt-4">
            <h2 className="text-md font-normal opactiy-[50%] mb-4">Select Payment Options</h2>
            {paymentMethods.map((method, index) => (
            <PaymentMethod
                key={index}
                className="mb-6 h-4/5"
                textClassName="text-white font-normal"
                imageClassName="w-13 h-102 rounded-md"
                {...method}
            />
            ))}
        </div>

        <div className="w-full max-w-md absolute z-100 bottom-4 mt-2" >
            <Footer className="w-full flex flex-col items-center justify-around gap-5">
            <div className="flex flex-col items-center justify-center gap">
            <h3 className="text-sm font-semibold text-white underline-offset-5">Total Amount</h3>
            <p className="text-4xl font-bold text-green-700 text-[36px]">$40</p>
            </div>
            <Button 
                label= "Pay Now" 
                type="primary" 
                className=" w-full text-white py-2 px-4 rounded-lg font-bold text-lg"
                onClick={() => navigate('/payment_failed')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Button> 
            
            
            </Footer>
        </div>
        </div>
    );
};

export default PaymentPage;