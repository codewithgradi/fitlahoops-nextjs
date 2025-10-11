import Link from 'next/link'
import React from 'react'


const Navbar = () => {

  return (
    <nav className='fixed top-0 left-0 w-full z-50 
                    bg-black/90 text-white shadow-xl backdrop-blur-sm
                    px-4 md:px-12 lg:px-24 py-4 
                    flex items-center justify-between transition-all duration-300'>
      
      <Link href='/' className='flex items-center justify-evenly font-extrabold text-2xl tracking-wide'>
        <p className='text-white transition-colors duration-300'>FITLA</p>
        <p className='text-orange-600 ml-1 transition-colors duration-300'>HOOPS</p>
      </Link>
      
      <ul className='flex items-center space-x-6 md:space-x-10 text-lg font-medium'>
        <li>
          <Link 
            href='#about' 
            // Apply hover:text-orange-400 for the required effect
            className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            href='#gallery' 
            className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'
          >
            Gallery
          </Link> 
        </li>
        <li>
          <Link 
            href='#events' 
            className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'
          >
            Events
          </Link>
        </li>
        <li>
          <Link 
            href='#connect' 
            className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'
          >
            Connect
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
