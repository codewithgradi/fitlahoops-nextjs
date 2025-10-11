import Link from 'next/link'
import React from 'react'


const NavbarFake = () => {

  return (
    <nav className='fixed top-0 left-0 w-full z-50 
                    bg-black/90 text-white shadow-xl backdrop-blur-sm
                    px-4 md:px-12 lg:px-24 py-4 
                    flex items-center justify-between transition-all duration-300'>
      
      <Link href='/' className='flex items-center justify-evenly font-extrabold text-2xl tracking-wide'>
        <p className='text-white transition-colors duration-300'>FITLA</p>
        <p className='text-orange-600 ml-1 transition-colors duration-300'>HOOPS</p>
      </Link>
    </nav>
  )
}

export default NavbarFake
