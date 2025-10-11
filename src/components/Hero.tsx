import React from 'react'
import Link from 'next/link'
const Hero = () => {
    // Using a placeholder image URL for the background
  const imageUrl = "https://res.cloudinary.com/dimxbalwn/image/upload/v1760107077/jump_1_xcy06g.png";

  return (
    <div 
      className='h-[90vh] w-full bg-cover bg-center relative'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className='absolute inset-0 bg-black/60'></div> 

      <div className='absolute inset-0 flex flex-col items-center justify-center text-white z-10'>
        <h1 className='text-6xl md:text-8xl font-black mb-4 tracking-tighter text-orange-500 drop-shadow-2xl'>
          KOTC
        </h1>
        <p className='text-xl md:text-3xl font-medium mb-10 uppercase tracking-widest text-gray-200'>
          ELEVATING THE GAME
        </p>
        <div className='flex space-x-6'>
          <Link href='#events'>
            <button className='px-8 py-4 bg-orange-600 text-white font-bold text-lg uppercase rounded-full hover:bg-orange-500 transition-all duration-300 shadow-xl transform hover:scale-105'>
              View Events
            </button>
          </Link>
          <Link href='#connect'>
            <button className='px-8 py-4 bg-white text-black font-bold text-lg uppercase rounded-full hover:bg-gray-200 transition-all duration-300 shadow-xl transform hover:scale-105'>
              Become a Sponsor
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}


export default Hero
