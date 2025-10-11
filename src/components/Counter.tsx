'use client'
import { useEffect, useState} from 'react'
import React from 'react'
type TextProps = {
  text: string,
  number :number,
}
const Counter = ({ text, number }: TextProps) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    // Check if the number is 10 or greater to trigger the animation
    if (number >= 10) {
      const duration = 2000; // 2 seconds animation duration
      const start = performance.now();
      
      // Animation function using requestAnimationFrame
      const animate = (time:DOMHighResTimeStamp) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        // Calculate the value based on the progress (e.g., 50% progress = 50% of the target number)
        const nextValue = Math.floor(progress * number);

        setCurrentNumber(nextValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      // Start the animation loop
      const animationId = requestAnimationFrame(animate);

      // Cleanup function to stop the animation if the component unmounts
      return () => cancelAnimationFrame(animationId);

    } else {
      // If number is less than 10, set it instantly
      setCurrentNumber(number);
    }
  }, [number]); // Rerun effect when the target number changes

  return (
    <div className='flex flex-col items-center p-12 rounded-2xl shadow-2xl'>
      <p className='text-6xl md:text-7xl font-extrabold text-orange-600 mb-2'>
        {currentNumber.toLocaleString()}
      </p>
      <div className='flex items-center space-x-1 text-xl font-medium text-gray-800 uppercase tracking-wider'>
        <p className='text-orange-500 font-bold'>+</p>
        <p className='text-gray-600'>{text}</p>
      </div>
    </div>
  )
}

export default Counter
