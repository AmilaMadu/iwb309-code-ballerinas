import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom'; // Import Link for navigation
import { assets } from '../assets/assets';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <header className='relative bg-gradient-to-r from-primary to-blue-500 overflow-hidden'>
      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 w-full h-full bg-overlay opacity-50 pointer-events-none z-10'></div>

      <div className='relative z-20 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-12 lg:px-16'>
        {/* ---------Left Side -------- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-6'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fadeIn'>
            Book Appointments <br /> Easily
          </h1>
          <p className='text-lg sm:text-xl text-white max-w-md animate-fadeIn delay-200'>
            Find a doctor that suits your requirements and schedule your appointment now!
          </p>

          {/* Buttons Container */}
          <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
            {/* Book Appointment Button */}
            <RouterLink 
              to="/doctors" // Update the navigation target to "/doctors"
              className='flex justify-center items-center gap-2 bg-white text-primary px-6 py-3 rounded-full shadow-md hover:bg-teal-100 transition transform hover:scale-105 animate-fadeIn delay-400 cursor-pointer'
            >
              <FaCalendarAlt className='w-5 h-5' />
              Book Appointment
            </RouterLink>

            {/* Create Account Button */}
            <button 
              onClick={() => { 
                navigate('/login'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className='flex justify-center items-center bg-white text-primary px-6 py-3 rounded-full shadow-md hover:bg-teal-100 transition transform hover:scale-105 animate-fadeIn delay-600'
            >
              <FaUserMd className='w-5 h-5' />
              Create Account/Login
            </button>
          </div>
        </div>

        {/* ----------Right Side --------*/}
        <div className='md:w-1/2 mb-8 md:mb-0'>
          <img 
            className='w-full h-auto rounded-lg shadow-lg animate-slideIn' 
            src={assets.header_img} 
            alt="Doctor Consultation" 
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
