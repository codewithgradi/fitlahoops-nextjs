'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='fixed top-0 left-0 w-full z-50 
                    bg-black/90 text-white shadow-xl backdrop-blur-sm
                    px-4 md:px-12 lg:px-24 py-4 
                    flex items-center justify-between transition-all duration-300'>
      
      <Link href='/' className='flex items-center justify-evenly font-extrabold text-2xl tracking-wide'>
        <p className='text-white transition-colors duration-300'>FITLA</p>
        <p className='text-orange-600 ml-1 transition-colors duration-300'>HOOPS</p>
      </Link>
      
      {/* Desktop Menu */}
      <ul className='hidden md:flex items-center space-x-6 md:space-x-10 text-lg font-medium'>
        <li>
          <Link href='#about' className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
            About
          </Link>
        </li>
        <li>
          <Link href='#gallery' className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
            Gallery
          </Link> 
        </li>
        <li>
          <Link href='#events' className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
            Events
          </Link>
        </li>
        <li>
          <Link href='#connect' className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
            Connect
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div className='md:hidden'>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='focus:outline-none'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className='absolute top-full left-0 w-full bg-black/90 flex flex-col items-center space-y-4 py-4 text-lg font-medium md:hidden'>
          <li>
            <Link href='#about' onClick={() => setMobileMenuOpen(false)} className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
              About
            </Link>
          </li>
          <li>
            <Link href='#gallery' onClick={() => setMobileMenuOpen(false)} className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
              Gallery
            </Link>
          </li>
          <li>
            <Link href='#events' onClick={() => setMobileMenuOpen(false)} className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
              Events
            </Link>
          </li>
          <li>
            <Link href='#connect' onClick={() => setMobileMenuOpen(false)} className='transition-colors duration-300 hover:text-orange-400 active:text-orange-500'>
              Connect
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
