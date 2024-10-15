import React, { useEffect } from 'react'
import { useLocation, useNavigate, Link} from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaCalendarAlt, FaUserMd } from 'react-icons/fa';
import { specialityData } from '../assets/assets'; 
import Image from '../assets/middle.png'; 

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const { pathname } = useLocation();
  useEffect(() => {
    // Scroll to the top of the page when the path changes
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
}, [pathname]);

  return (
    <div>
      <header className='relative bg-gradient-to-r from-primary to-blue-500 overflow-hidden'>

<div className='absolute top-0 left-0 w-full h-full bg-overlay opacity-50 pointer-events-none z-10'></div>

<div className='relative z-20 flex flex-col-reverse md:flex-row-reverse items-center justify-between max-w-7xl mx-auto px-6 py-12 lg:px-16 gap-20'>
  {/* ---------Right Side (Text and Buttons) -------- */}
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
      <Link 
        to="/doctors" 
        className='flex justify-center items-center gap-2 bg-white text-primary px-6 py-3 rounded-full shadow-md hover:bg-teal-100 transition transform hover:scale-105 animate-fadeIn delay-400 cursor-pointer'
      >
        <FaCalendarAlt className='w-5 h-5' />
        Book Appointment
      </Link>

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

  {/* ----------Left Side (Image) --------*/}
  <div className='md:w-1/2 mb-8 md:mb-0'>
    <img 
      className='w-full h-auto rounded-lg shadow-lg animate-slideIn' 
      src={assets.header_img} 
      alt="Doctor Consultation" 
    />
  </div>
</div>
</header>
<section
      id="speciality"
      className="py-16 bg-gradient-to-r from-white-100 to-white"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="text-2xl sm:text-3xl lg:text-6xl font-bold text-center text-gray-800 mb-12 animate-fadeIn">
          I'm Searching for a
        </h2>

        {/* Two-Column Layout */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Speciality Tiles */}
          <div className="w-full md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {specialityData.map((item, index) => (
                <Link
                  key={index}
                  to={`/doctors/${item.speciality}`}
                  className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer group"
                >
                  {/* Icon */}
                  <div className="text-teal-500 text-4xl mb-4 transition-transform duration-300 group-hover:translate-x-2">
                    {item.icon}
                  </div>
                  
                  {/* Speciality Name */}
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {item.speciality}
                  </h3>
                  
                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-600 mb-4 text-center">
                      {item.description}
                    </p>
                  )}
                  
                  {/* Arrow Icon */}
                  <div className="mt-auto">
                    <svg
                      className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={Image}
              alt="Speciality Illustration"
              className="w-full max-w-md rounded-lg shadow-lg object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          
        </div>
      </div>
    </section>
    </div>
  )
}

export default Home