import React from 'react'
import Link from 'next/link'

const Hero = () => {
  const imageUrl = "https://res.cloudinary.com/dimxbalwn/image/upload/v1760107077/jump_1_xcy06g.png";

  return (
    <div 
      className='h-[90vh] w-full bg-cover bg-center relative'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60'></div> 

      {/* Content */}
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4 sm:px-6'>
        <h1 className='text-4xl sm:text-6xl md:text-8xl font-black mb-4 tracking-tighter text-orange-500 drop-shadow-2xl text-center'>
          KOTC
        </h1>
        <p className='text-lg sm:text-xl md:text-3xl font-medium mb-8 sm:mb-10 uppercase tracking-widest text-gray-200 text-center'>
          ELEVATING THE GAME
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6'>
          <Link href='#events'>
            <button className='px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 text-white font-bold text-base sm:text-lg uppercase rounded-full hover:bg-orange-500 transition-all duration-300 shadow-xl transform hover:scale-105'>
              View Events
            </button>
          </Link>
          <Link href='#connect'>
            <button className='px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold text-base sm:text-lg uppercase rounded-full hover:bg-gray-200 transition-all duration-300 shadow-xl transform hover:scale-105'>
              Become a Sponsor
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
