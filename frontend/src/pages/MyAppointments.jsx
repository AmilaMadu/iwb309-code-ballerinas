import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../Contexts/AppContext';
import { assets } from '../assets/assets';

const MyAppointments = () => {
  const { user_id } = useContext(AppContext); // Assuming user_id is available in context
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const fetchAppointments = async () => {
    setLoading(true);  // Set loading to true before fetching new data
    try {
      const response = await fetch(`http://localhost:9090/backend/appointments/${user_id.user_id}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };
  // Fetch appointments when the component loads
  useEffect(() => {
    fetchAppointments();
  }, [user_id]);

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
    navigate(`/my-appointments`); 
    window.scrollTo(0, 0); // Scroll to top of the page
  },300);
};

  // Handle appointment cancellation
  const handleCancelAppointment = async (appointment) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this appointment?');
    if (confirmCancel) {
        try {
            const encodedDate = encodeURIComponent(appointment.appointment_date);
            const encodedTime = encodeURIComponent(appointment.appointment_time);
            const response = await fetch(`http://localhost:9090/backend/appointments/${user_id.user_id}/${appointment.doctor_id}/${encodedDate}/${encodedTime}`, {
                method: 'DELETE',
            });
            if (response.ok) {
              setModalMessage('Appointment canceled successfully.');
              setShowModal(true);
              setAppointments(prevAppointments => prevAppointments.filter(appt => appt._id !== appointment._id));
              await fetchAppointments();
                
            } else {
              console.error('Failed to cancel appointment');
              setModalMessage('Failed to cancel the appointment. Please try again.');
              setShowModal(true);
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('An error occurred while trying to cancel the appointment.');
        }
    }
};



  return (
    <div className='max-w-4xl mx-auto px-6 py-10'>
      {/* Header */}
      <p className='pb-4 mt-8 font-semibold text-xl text-gray-800 border-b border-gray-300'>
        My Appointments
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : appointments.length > 0 ? (
        <div className='mt-6 space-y-6'>
          {appointments.map((appointment, index) => (
            <div
              className='grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-4 sm:gap-8 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300'
              key={index}
            >
              {/* Doctor Image */}
              <div className='flex justify-center'>
                <img
                  className='w-32 h-32 rounded-lg object-cover'
                  src={assets.doc_pic} // Assuming the backend provides doctor image
                  alt={appointment.doctor_name}
                />
              </div>

              {/* Appointment Details */}
              <div className='flex flex-col justify-between text-sm text-gray-600'>
                <div>
                  <p className='text-lg text-gray-900 font-semibold'>{appointment.doctor_name}</p>
                  <p className='text-gray-500'>{appointment.speciality}</p>
                </div>
                <div className='mt-2'>
                  <p className='font-medium text-gray-700'>Date & Time:</p>
                  <p className='text-gray-500'>
                    {new Date(appointment.appointment_date).toLocaleDateString()} | {appointment.appointment_time}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col justify-between'>
                <button
                  onClick={() => handleCancelAppointment(appointment)} // Pass appointment ID here
                  className='w-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded mt-2 transition-all duration-300'
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments found.</p>
      )}

{showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-semibold text-green-600 mb-4">{modalMessage}</h3>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default MyAppointments;
