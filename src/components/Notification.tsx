import React from 'react'
import { BsX } from 'react-icons/bs';

type NProps={
  notification :string
}

const Notification = ({ notification }: NProps) => {
  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center space-x-2">
    <BsX className="w-5 h-5" />
    <p className="m-0 font-medium">{notification}</p>
</div>
  )
}

export default Notification
