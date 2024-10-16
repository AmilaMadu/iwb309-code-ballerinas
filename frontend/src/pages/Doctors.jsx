import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext'; // Adjust the import path as needed
import { assets } from '../assets/assets';

const Doctors = () => {
  const { speciality: urlSpeciality } = useParams();
  const navigate = useNavigate();

  const { doctors, isLoading, error } = useContext(AppContext); // Access doctors from context

  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(urlSpeciality || '');

  // List of unique specialties for the dropdown
  const specialities = React.useMemo(() => {
    return Array.from(new Set(doctors.map(doc => doc.speciality)));
  }, [doctors]);

  // Apply filter whenever doctors or selectedSpeciality changes
  useEffect(() => {
    if (selectedSpeciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === selectedSpeciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, selectedSpeciality]);

  // Handle dropdown change
  const handleSpecialityChange = (e) => {
    const selected = e.target.value;
    setSelectedSpeciality(selected);
    if (selected) {
      navigate(`/doctors/${selected}`);
    } else {
      navigate('/doctors');
    }
  };

  // Handle navigation to appointment booking
  const handleChannelClick = (doctor_id) => {
    navigate(`/appointment/${doctor_id}`);
    window.scrollTo(0, 0);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-gray-600">Loading doctors...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500">Error fetching doctors: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <p className="text-gray-600 mb-4">Browse through the specialists.</p>

      {/* Dropdown to select doctors by speciality */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="speciality-select">
          Select Speciality
        </label>
        <select 
          id="speciality-select" 
          className="border p-2 rounded w-full"
          value={selectedSpeciality}
          onChange={handleSpecialityChange}
        >
          <option value="">All Specialities</option>
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 gap-4">
        {filterDoc.length > 0 ? (
          filterDoc.map((doctor) => (
            <div 
              key={doctor.doctor_id} 
              className="flex items-center border p-4 rounded shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="w-16 h-16 mr-4">
  {doctor.image ? (
    <img 
      className="rounded-full w-full h-full object-cover" 
      src={doctor.image} 
      alt={doctor.name} 
    />
  ) : (
    <img 
      className="rounded-full w-full h-full object-cover" 
      src={assets.doc_pic} // Use the default image
      alt={doctor.name} 
    />
  )}
</div>

              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>

              <button 
                onClick={() => handleChannelClick(doctor.doctor_id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Channel
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No doctors available for the selected speciality.</p>
        )}
      </div>
    </div>
  );
};

export default Doctors;
