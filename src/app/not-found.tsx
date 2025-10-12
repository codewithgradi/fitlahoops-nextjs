import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-md text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded hover:bg-yellow-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
