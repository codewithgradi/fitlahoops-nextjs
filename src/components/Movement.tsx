import React from 'react'
import MovementCard from './MovementCard'


const Movement = () => {
    const cardData = [
    {
            id: 1,
        type:'sponsor',
        title: 'Sponsor',
        perks: ['Be part of the community', 'Social media mention (monthly)'],
    },
    {
        id: 2,
        type:'volunteer',
        title: 'Volunteer',
        perks: ['**Prominent** logo on jerseys', 'Dedicated social media features', 'VIP event access & meet-and-greets'],
    },
    {
        id: 3,
        type:'partner',
        title: 'Partner',
        perks: ['Naming rights opportunities', 'Social Media Mentions', 'Guaranteed one-on-one time with team leadership'],
    },
];
  return (
    <div>
         <div className="text-center p-8 bg-white">
  <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
    JOIN THE MOVEMENT
  </h1>
  <p className="text-xl font-medium text-gray-600">
    Partner with us as a sponsor or volunteer.
  </p>
</div>
          <MovementCard data={cardData}/>
          
    </div>
  )
}

export default Movement
