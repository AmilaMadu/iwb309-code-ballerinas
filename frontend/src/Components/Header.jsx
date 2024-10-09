import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import { assets } from '../assets/assets';

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* ---------Left Side -------- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-4 m-auto md:py-[6.5vw] md:mb-[-20px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointments <br /> Easily
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>Find a doctor which suits your requirements<br className='hidden sm:block' /> and schedule your appointment now! </p>
        </div>

        {/* Buttons Container */}
        <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
          {/* Book Appointment Button */}
          <a 
            href="#speciality" 
            className='flex justify-center items-center gap-2 bg-white px-8 py-4 w-full sm:w-auto text-gray-600 text-sm sm:text-base rounded-full hover:scale-105 transition-all duration-300'
          >
            Book Appointment 
          </a>

          {/* Create Account Button */}
          <button 
            onClick={() => { 
              navigate('/login'); 
              scrollTo(0, 0); 
            }} 
            className='flex justify-center items-center bg-white px-8 py-4 w-full sm:w-auto text-gray-600 text-sm sm:text-base rounded-full hover:scale-105 transition-all duration-300'
          >
            Create Account
          </button>
        </div>
      </div>

      {/* ----------Right Side --------*/}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-11 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  );
}

export default Header;