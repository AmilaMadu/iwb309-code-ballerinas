import React from 'react';
import { AppContext } from '../Contexts/AppContext';
import { useContext } from 'react';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className='max-w-4xl mx-auto px-6 py-10'>
      {/* Header */}
      <p className='pb-4 mt-8 font-semibold text-xl text-gray-800 border-b border-gray-300'>
        My Appointments
      </p>

      {/* Appointments List */}
      <div className='mt-6 space-y-6'>
        {doctors.slice(0, 4).map((item, index) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-4 sm:gap-8 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300'
            key={index}
          >
            {/* Doctor Image */}
            <div className='flex justify-center'>
              <img
                className='w-32 h-32 rounded-lg object-cover'
                src={item.image}
                alt={item.name}
              />
            </div>

            {/* Doctor Details */}
            <div className='flex flex-col justify-between text-sm text-gray-600'>
              <div>
                <p className='text-lg text-gray-900 font-semibold'>{item.name}</p>
                <p className='text-gray-500'>{item.speciality}</p>
              </div>
              <div className='mt-2'>
                <p className='font-medium text-gray-700'>Date & Time:</p>
                <p className='text-gray-500'>25 July, 2024 | 8:30 PM</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col justify-between'>
              <button className='w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded mt-2 transition-all duration-300'>
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
