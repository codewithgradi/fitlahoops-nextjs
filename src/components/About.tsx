import React from 'react'
import Counter from './Counter'

const About = () => {
    const data = [
        {id:1 , number : 10, text:'tournaments'},
        {id:2 , number : 100, text:'players'},
        {id:3 , number : 50, text:'volunteers'},
    ]
  return (
    <div id='about' className='bg-emerald-50 my-15 py-15'>
          <h1 className='font-bold text-center py-4 text-4xl'>More than just tournaments</h1>
          <p className='opacity-45 py-3 text-center'>We&apos;re growing sport in our community</p>
          <div className='grid grid-cols-3 px-10 gap-x-5 my-10'>
              {data.map(d => (
                  <Counter key={d.id} text={ d.text} number={d.number} />
              ))}
          </div>
          <div className='py-6 flex flex-col items-center justify-center opacity-85 my-10'>
              <p>
                  The growth of basketball culture in Durban in recent times coupled by the limited activities for
                  the youth
              </p>
              <p>
                  around Durban gave birth to the King of the Court (KOTC) tournament.
                  The first tournament was in 2020 
              </p>
              <p>
                and progressively, the tournaments have helped the
                youth showcase and build their skills as well as
              </p> 
              <p>
                  encourage them to engage with other
              basketball players; thereby helping enhance their networking skills.
              </p>
              <p>
              The tournament has also encouraged diversity and welcomes players from all backgrounds.
                  
              </p>
          </div>
          <p className='text-center opacity-60 my-5 '>Partnered with  local community centers.</p>
    </div>
  )
}

export default About
