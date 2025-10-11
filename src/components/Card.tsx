'use client'
import React from 'react'
import { useRouter } from 'next/navigation'  // App Router

type ImageProps = {
  id: string        // Add the event id
  image: string
  tournament: string
  category: string
}

const Card = ({ id, image, tournament, category }: ImageProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/event/${id}`)  // Navigate to dynamic route
  }

  return (
    <div 
      onClick={handleClick}
      className='rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition duration-300 cursor-pointer bg-white'
    >
      <img 
        src={image} 
        alt={tournament} 
        className='w-full h-48 object-cover' 
      />
      <div className='p-4'>
        <span className='text-xs font-medium uppercase text-orange-500'>{category}</span>
        <p className='text-lg font-semibold text-gray-800 truncate mt-1'>{tournament}</p>
      </div>
    </div>
  )
}

export default Card
