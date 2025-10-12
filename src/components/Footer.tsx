import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaUber } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          
          {/* 1. Logo and Tagline (Spans 2 columns on mobile) */}
          <div className="col-span-2 md:col-span-1">
            {/* HOOPS text uses orange accent */}
            <Link href="/" className="text-3xl font-extrabold text-orange-500 hover:text-orange-400 transition duration-200">
              <span className="tracking-widest">FITLAHOOPS</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Growing basketball culture since 2018. Connect, play, and dominate.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                {/* Link hover uses orange */}
                <Link href="#about" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">About</Link>
              </li>
              <li>
                <Link href="#gallery" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">Gallery</Link>
              </li>
              <li>
                <Link href="#events" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">Events</Link>
              </li>
              <li>
                <Link href="#connect" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">Connect</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-orange-400 transition duration-200 text-sm">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
            <div className="flex space-x-5 mt-4">
              <Link target='_blank' href="https://www.facebook.com/people/Fitla-Hoops/61578726521429/#" aria-label="Facebook" className="text-gray-400 hover:text-orange-500 transition duration-200">
                <FaFacebook className="w-6 h-6" />
              </Link>
              <Link target='_blank' href="https://www.instagram.com/fitla_hoops/" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition duration-200">
                <FaInstagram className="w-6 h-6" />
              </Link>
              <Link target='_blank' href="/admin/auth" aria-label="Instagram" className="text-gray-400 hover:text-orange-500 transition duration-200">
                <FaUber className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom (Copyright and CTA) */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-500">
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; 2025 FitlaHoops. All rights reserved.
          </p>
          
          {/* Register Now CTA Button */}
          <div className="order-1 md:order-2">
            <a 
              href="#events" 
              // Button background and focus ring use orange
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;