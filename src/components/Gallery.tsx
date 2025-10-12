'use client'
import { useEffect, useState } from 'react'
import Card from './Card'

type CategoryEvent = "BEHIND_SCENES" | "TOURNAMENTS" | "LEAGUES";

type Event = {
  id: string;
  event: string;
  location: string;
  date: string;
  category: CategoryEvent;
  img: string;
  title: string;
  createdAt: string;
};

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const json = await res.json();

        // Ensure we set an array, even if API returns an object
        const events: Event[] = Array.isArray(json) ? json : json.events || [];
        setData(events);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Tournaments', value: 'TOURNAMENTS' },
    { label: 'Leagues', value: 'LEAGUES' },
    { label: 'Behind Scenes', value: 'BEHIND_SCENES' },
  ];

  // Ensure data is an array before filtering
  const upcoming = Array.isArray(data) 
    ? data.filter(d => new Date(d.date) < new Date())
    : [];

  const filteredData = upcoming.filter(d =>
    filter === 'all' || d.category === filter
  );

  return (
    <section id='gallery' className='py-20 bg-gray-100'>
      <div className='container mx-auto p-2'>
        <div className='flex flex-col items-center justify-center text-center'>
          <h1 className='text-4xl md:text-5xl font-black uppercase text-gray-900 tracking-wider mb-2'>
            OUR <span className='text-orange-600'>LEGACY</span> IN ACTION
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            Past tournaments and league highlights
          </p>

          <div className='flex flex-wrap justify-center gap-3 py-3 mb-12'>
            {filterButtons.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-6 py-2 rounded-full font-bold text-sm uppercase transition-all duration-300 shadow-md
                  ${filter === value
                    ? 'bg-orange-600 text-white transform scale-105 shadow-xl'
                    : 'bg-white text-gray-800 hover:bg-orange-100 hover:text-orange-600'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto'>
            {filteredData.map(d => (
              <Card
                id={d.id}
                image={d.img}
                tournament={d.title}
                category={d.category.replace('_', ' ')}
                key={d.id}
              />
            ))}
          </div>

          {filteredData.length === 0 && (
            <p className="text-gray-500 mt-8">No highlights found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
