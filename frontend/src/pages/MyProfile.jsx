import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Lahiru Kanishka",
    image: assets.profile_pic,
    email: 'lahirucooray2000@gmail.com',
    phone: '+94 70 2450126',
    address: {
      line1: "University of Moratuwa",
      line2: "Moratuwa, Sri Lanka"
    },
    gender: 'Male',
    dob: '01-08-2000'
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
      {/* Profile Image */}
      <div className='flex flex-col items-center'>
        <img className='w-36 h-36 rounded-full shadow-lg' src={userData.image} alt="Profile" />
        
        {/* User Name */}
        {isEdit ? (
          <input
            className='bg-gray-100 text-3xl font-semibold mt-4 text-center p-2 rounded border border-gray-300 w-full max-w-md'
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <h1 className='font-semibold text-3xl text-gray-800 mt-4'>{userData.name}</h1>
        )}
      </div>

      {/* Contact Information */}
      <div className='mt-8'>
        <p className='text-lg text-primary font-bold border-b pb-2'>Contact Information</p>
        <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-4'>
          <p className='font-medium text-gray-700'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium text-gray-700'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 p-2 rounded border border-gray-300'
              type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-gray-700'>{userData.phone}</p>
          )}

          <p className='font-medium text-gray-700'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col'>
              <input
                className='bg-gray-100 p-2 mb-2 rounded border border-gray-300'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={userData.address.line1}
                type="text"
              />
              <input
                className='bg-gray-100 p-2 rounded border border-gray-300'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={userData.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p className='text-gray-700'>
              {userData.address.line1} <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className='mt-8'>
        <p className='text-lg text-primary font-bold border-b pb-2'>Basic Information</p>
        <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-4'>
          <p className='font-medium text-gray-700'>Gender:</p>
          {isEdit ? (
            <select
              className='bg-gray-100 p-2 rounded border border-gray-300'
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-700'>{userData.gender}</p>
          )}

          <p className='font-medium text-gray-700'>Birthday:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 p-2 rounded border border-gray-300'
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className='text-gray-700'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Save/Edit Button */}
      <div className='mt-8 flex justify-center'>
        {isEdit ? (
          <button
            className='px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-blue-600 transition-all'
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className='px-6 py-2 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
