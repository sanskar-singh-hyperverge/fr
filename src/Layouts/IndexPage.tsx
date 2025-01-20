import React from 'react'
import { HomeHero } from 'movie-design-hv'
import {useNavigate} from 'react-router-dom'
import {Button, Divider} from 'movie-design-hv'

const IndexPage:React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <HomeHero 
        logoClassName="h-12"
        className="absolute"
        backgroundImage="/bgImage.jpg"
        logoImage="/Group 3.png"
        overlayColor= "rgba(0, 0, 0, 0.7)"
        overlayOpacity= {0.4}
      />

      <div className="absolute z-10 w-2/3 mx-auto inset-x-0 bottom-[10%] justify flex flex-col items-center  bottom-100">
        <Button
          type="primary"
          size="large"
          label="Sign In"
          className="w-full bg-purple-700 text-white hover:bg-purple-800 transition-all"
          onClick={() => navigate('/sign_in')}
        />

        <Divider
          text="or"
          width="w-full"
          className="text-gray-300 flex my-[10px] "
          textClassName="text-gray-400"
        />

        <Button
          label="Sign Up"
          type="primary"
          size="large"
          className="w-full bg-purple-700 text-white hover:bg-purple-800 transition-all"
          onClick={() => navigate('/sign_up')}
        />
      </div>
    </div>
  )
}

export default IndexPage