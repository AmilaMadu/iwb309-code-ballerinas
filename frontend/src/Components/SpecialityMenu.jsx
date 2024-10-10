import React from 'react';
import Header from './Header';
import { specialityData } from '../assets/assets'; // Importing the specialityData from assets.js
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Importing the arrow icon
import Image from '../assets/middle.png';  // Import your image here

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-8 py-16 text-gray-800' id='speciality'>
      {/* Section Header */}
      <h1 className='text-5xl font-semibold text-center'>I'm searching for a</h1>
      
      {/* Two-Column Layout */}
      <div className='w-full max-w-screen-lg flex flex-col md:flex-row items-center justify-center gap-10'>
        
        {/* Left Side - Speciality List */}
        <div className='w-full md:w-1/2'>
          <ul className='flex flex-col gap-5 w-full'>
            {specialityData.map((item, index) => (
              <li 
                key={index} 
                className='group flex justify-center items-center gap-3 border-b pb-3 hover:bg-blue-50 transition-all duration-300 ease-in-out'
              >
                <Link 
                  to={`doctors/${item.speciality}`} 
                  className='flex items-center gap-3 text-lg group-hover:text-blue-600 transition-colors duration-300'
                >
                  {/* Arrow Icon */}
                  <FaArrowRight className='text-blue-500 group-hover:text-blue-600 transition-colors duration-300' />
                  
                  {/* Speciality Name */}
                  <span className='text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                    {item.speciality}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - Image */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <img src={Image} alt='Speciality Illustration' className='rounded-lg shadow-lg w-full max-w-xs' />
        </div>
        
      </div>
    </div>
  );
};

export default SpecialityMenu;
