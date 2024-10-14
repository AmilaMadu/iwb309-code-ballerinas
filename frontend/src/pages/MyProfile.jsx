// import React, { useState, useContext } from 'react';
// import { assets } from '../assets/assets';
// import { AppContext } from '../Contexts/AppContext'; // Import your AppContext

// const MyProfile = () => {
//   const { user } = useContext(AppContext); // Access user data from context
//   const {user_id, setUserId} = useContext(AppContext)
//   // Initialize userData with context data
//   const [userData, setUserData] = useState({
//     name: user_id?.name || "Lahiru Kanishka",
//     image: user?.image || assets.profile_pic,
//     email: user_id?.email || 'xxxxx@xxx.xxx',
//     phone: user?.phone || '+xx xx xxxxxx',
//     address: {
//       line1: user?.address?.line1 || "University of Moratuwa",
//       line2: user?.address?.line2 || "Moratuwa, Sri Lanka"
//     },
//     gender: user?.gender || 'Male',
//     dob: user?.dob || '01-08-2000'
//   });

//   const [isEdit, setIsEdit] = useState(false);

//   return (
//     <div className='max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg'>
//       {/* Profile Image */}
//       <div className='flex flex-col items-center'>
//         <img className='w-36 h-36 rounded-full shadow-lg' src={userData.image} alt="Profile" />
        
//         {/* User Name */}
//         {isEdit ? (
//           <input
//             className='bg-gray-100 text-3xl font-semibold mt-4 text-center p-2 rounded border border-gray-300 w-full max-w-md'
//             type="text"
//             value={userData.name}
//             onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} // Update state on change
//           />
//         ) : (
//           <h1 className='font-semibold text-3xl text-gray-800 mt-4'>{userData.name}</h1>
//         )}
//       </div>

//       {/* Contact Information */}
//       <div className='mt-8'>
//         <p className='text-lg text-primary font-bold border-b pb-2'>Contact Information</p>
//         <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-4'>
//           <p className='font-medium text-gray-700'>Email:</p>
//           <p className='text-blue-500'>{userData.email}</p>

//           <p className='font-medium text-gray-700'>Phone:</p>
//           {isEdit ? (
//             <input
//               className='bg-gray-100 p-2 rounded border border-gray-300'
//               type="text"
//               value={userData.phone}
//               onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} // Update state on change
//             />
//           ) : (
//             <p className='text-gray-700'>{userData.phone}</p>
//           )}

//           <p className='font-medium text-gray-700'>Address:</p>
//           {isEdit ? (
//             <div className='flex flex-col'>
//               <input
//                 className='bg-gray-100 p-2 mb-2 rounded border border-gray-300'
//                 onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} // Update state on change
//                 value={userData.address.line1}
//                 type="text"
//               />
//               <input
//                 className='bg-gray-100 p-2 rounded border border-gray-300'
//                 onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} // Update state on change
//                 value={userData.address.line2}
//                 type="text"
//               />
//             </div>
//           ) : (
//             <p className='text-gray-700'>
//               {userData.address.line1} <br />
//               {userData.address.line2}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Basic Information */}
//       <div className='mt-8'>
//         <p className='text-lg text-primary font-bold border-b pb-2'>Basic Information</p>
//         <div className='grid grid-cols-[1fr_2fr] gap-y-4 mt-4'>
//           <p className='font-medium text-gray-700'>Gender:</p>
//           {isEdit ? (
//             <select
//               className='bg-gray-100 p-2 rounded border border-gray-300'
//               onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} // Update state on change
//               value={userData.gender}
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           ) : (
//             <p className='text-gray-700'>{userData.gender}</p>
//           )}

//           <p className='font-medium text-gray-700'>Birthday:</p>
//           {isEdit ? (
//             <input
//               className='bg-gray-100 p-2 rounded border border-gray-300'
//               type="date"
//               onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} // Update state on change
//               value={userData.dob}
//             />
//           ) : (
//             <p className='text-gray-700'>{userData.dob}</p>
//           )}
//         </div>
//       </div>

//       {/* Save/Edit Button */}
//       <div className='mt-8 flex justify-center'>
//         {isEdit ? (
//           <button
//             className='px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-blue-600 transition-all'
//             onClick={() => setIsEdit(false)} // Save changes
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             className='px-6 py-2 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all'
//             onClick={() => setIsEdit(true)} // Edit mode
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyProfile;
import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Contexts/AppContext'; // Import your AppContext

const MyProfile = () => {
  const { user } = useContext(AppContext); // Access user data from context
  const {user_id, setUserId} = useContext(AppContext)
  // Initialize userData with context data or default values for missing info
  const [userData, setUserData] = useState({
    user_id: user_id.user_id || '',
    name: user_id?.name || "",
    image: user_id?.image || assets.profile_pic,
    email: user_id?.email || 'xxxxx@xxx.xxx',
    phone: user_id?.phone || '',
    address: {
      line1: user_id?.address?.line1 || '',
      line2: user_id?.address?.line2 || ''
    },
    gender: user_id?.gender || '',
    dob: user_id?.dob || ''
  });

  const [isEdit, setIsEdit] = useState(false);

  // Function to handle the submission of edited data
  // const handleSave = () => {
  //   // Here you could send the updated data to the backend using an API call
  //   console.log("Updated Profile Data: ", userData);
  //   setIsEdit(false); // Exit edit mode after saving
  // };
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:9090/backend/update_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),  // Send the updated user data
      });
  
      if (!response.ok) {
        const errorResponse = await response.json(); // Read the error response bod
        throw new Error('Failed to update profile');
      }
      
  
      const result = await response.json();
      console.log('Profile updated successfully:', result);
  
      // Optionally, update the user context or state here
      setUserData(userData);
      setUserId(prev => ({ ...prev, ...userData })); // Assuming user_id is your user state in context
      setIsEdit(false);  // Exit edit mode
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

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
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} // Update state on change
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
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} // Update state on change
            />
          ) : (
            <p className='text-gray-700'>{userData.phone || "Not Provided"}</p>
          )}

          <p className='font-medium text-gray-700'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col'>
              <input
                className='bg-gray-100 p-2 mb-2 rounded border border-gray-300'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} // Update state on change
                value={userData.address.line1}
                placeholder="Address Line 1"
                type="text"
              />
              <input
                className='bg-gray-100 p-2 rounded border border-gray-300'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} // Update state on change
                value={userData.address.line2}
                placeholder="Address Line 2"
                type="text"
              />
            </div>
          ) : (
            <p className='text-gray-700'>
              {userData.address.line1 || "Not Provided"} <br />
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
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} // Update state on change
              value={userData.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-700'>{userData.gender || "Not Provided"}</p>
          )}

          <p className='font-medium text-gray-700'>Birthday:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 p-2 rounded border border-gray-300'
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} // Update state on change
              value={userData.dob}
            />
          ) : (
            <p className='text-gray-700'>{userData.dob || "Not Provided"}</p>
          )}
        </div>
      </div>

      {/* Save/Edit Button */}
      <div className='mt-8 flex justify-center'>
        {isEdit ? (
          <button
            className='px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-blue-600 transition-all'
            onClick={handleSave} // Save changes
          >
            Save Information
          </button>
        ) : (
          <button
            className='px-6 py-2 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all'
            onClick={() => setIsEdit(true)} // Edit mode
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;