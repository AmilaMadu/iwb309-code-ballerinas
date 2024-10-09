import React from 'react';
import Header from './Header';
import { specialityData } from '../assets/assets';   // Importing the specialityData from assets.js
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Importing the arrow icon

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
      <h1 className='text-3xl font-medium text-center'>I'm searching for a</h1>
      <div className='w-full max-w-screen-lg flex flex-col items-center'>
        <ul className='flex flex-col gap-4 w-full'>
          {specialityData.map((item, index) => (
            <li key={index} className='flex justify-center items-center gap-3 border-b pb-2 hover:bg-gray-100 transition-all'>
              <Link to={`doctors/${item.speciality}`} className='flex items-center gap-3'>
                <FaArrowRight className='text-blue-500 flex-shrink-0 self-center' /> {/* Aligning arrow */}
                <span className='text-gray-800 text-lg'>{item.speciality}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpecialityMenu;
