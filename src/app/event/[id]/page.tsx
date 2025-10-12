import Footer from '@/components/Footer';
import NavbarFake from '@/components/NavFake';
import Image from 'next/image'
import React from 'react'

interface Props {
  params: Promise<{id:string}>
}
export const dynamic = "force-dynamic";

type EventCategory = 'BEHIND_SCENES' | 'TOURNAMENTS' | 'LEAGUES';

type Event = {
  id: string,
  event: string,
  location: string,
  date: Date,
  category: EventCategory,
  img: string,
  title: string,
}

const EventDynamicPage = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  if (!res.ok) throw new Error("Could not fetch data");

  const data: Event = await res.json();

  return (
    <>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <NavbarFake />
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Event Image */}
        <div className="md:w-1/3 w-full relative h-64 md:h-auto">
          <Image 
            src={data.img} 
            alt={data.title} 
            fill 
            className="object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">{data.event}</h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{data.title}</h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium text-gray-700">Location:</span> {data.location}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium text-gray-700">Date:</span> {new Date(data.date).toLocaleDateString()}
            </p>
              <p className="text-gray-700 leading-relaxed">
                &apos;Fitla Hoops&apos; is where passion
                meets performance. We&apos;re more than just a brand—we&apos;re a community of athletes,
                dreamers, and game-changers who live and breathe the court.
                From cutting-edge gear and apparel to innovative training programs,
                we equip players of all levels to reach their full potential. Whether you&apos;re
                sinking threes in your driveway or competing in packed arenas, we provide the tools,
                guidance, and inspiration to elevate every game. At Hoop Dreams, every dribble,
                every pass,
                every shot is a step toward greatness.
                Step onto the court, and let&apos;s make every play unforgettable.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">{data.category}</span>
          </div>

        </div>
      </div>
    </div>
      <Footer />
      </>
  )
}

export default EventDynamicPage
