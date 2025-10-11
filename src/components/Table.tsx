import React from 'react'

type EventCategory = 'BEHIND_SCENES' | 'TOURNAMENTS' | 'LEAGUES'

type Event = {
  id: string
  event: string
  location: string
  date: string // assuming backend sends ISO string
  category: EventCategory
  img: string
  public_id: string
  title: string
  createdAt: string
  updatedAt: string
}

const Table = async () => {
  const res = await fetch('http://localhost:3000/api/events') // full URL for server-side fetch
    const data: Event[] = await res.json()
const upcoming = data.filter(d => new Date(d.date) > new Date());

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-black mb-12 text-center text-gray-900 uppercase tracking-wider">
          Upcoming Event Schedule
        </h2>

        <div className="bg-white rounded-xl shadow-2xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcoming.map((d, index) => (
                <tr
                  key={d.id}
                  className={
                    index % 2 === 0
                      ? 'bg-white hover:bg-gray-50 transition-colors cursor-pointer'
                      : 'bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer'
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {new Date(d.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {d.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {d.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Table
