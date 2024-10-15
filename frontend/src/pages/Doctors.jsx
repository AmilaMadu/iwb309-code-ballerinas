import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

const Doctors = () => {
  const { speciality: urlSpeciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(urlSpeciality || '');
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  // List of unique specialties for the dropdown
  const specialities = Array.from(new Set(doctors.map(doc => doc.speciality)));

  const applyFilter = (speciality) => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    console.log('Selected speciality:', selectedSpeciality);
    applyFilter(selectedSpeciality);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [doctors, selectedSpeciality]);

  // Handle dropdown change
  const handleSpecialityChange = (e) => {
    const selected = e.target.value;
    setSelectedSpeciality(selected);
    if (selected) {
      navigate(`/doctors/${selected}`);
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    } else {
      navigate('/doctors');
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };

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
        {
          filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center border p-4 rounded shadow-md hover:shadow-lg transition duration-300"
              >

                <div className="w-16 h-16 mr-4">
                  {item.image ? (
                    <img className="rounded-full w-full h-full object-cover" src={item.image} alt={item.name} />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                      <span>No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>

                {/* Channel Button */}
                <button 
                  onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)} }
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Channel
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No doctors available for the selected speciality.</p>
          )
        }
      </div>
    </div>
  );
};

export default Doctors;
