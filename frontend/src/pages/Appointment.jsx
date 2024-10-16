import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext'; // Adjust the import path as needed
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { assets } from '../assets/assets';

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, user_id } = useContext(AppContext);
  
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  // Fetch doctor information based on docId
  useEffect(() => {
    const doctor = doctors.find(doc => String(doc.doctor_id) === String(docId));
    setDocInfo(doctor || null);
  }, [doctors, docId]);

  // Fetch booked slots for the selected date and doctor
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (docInfo && selectedDate) {
        const date = new Date(selectedDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        console.log(`Fetching booked slots for doctor: ${docId}, date: ${formattedDate}`);

        setIsFetchingSlots(true);
        setSlotsError(null);

        try {
          const response = await fetch(`${backendUrl}/backend/booked_slots/${docId}/${formattedDate}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const bookedSlots = await response.json();
            generateSlots(selectedDate, bookedSlots);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching booked slots');
          }
        } catch (error) {
          console.error('Error fetching booked slots:', error);
          setSlotsError(error.message);
          setAvailableSlots([]); // Clear available slots on error
        } finally {
          setIsFetchingSlots(false);
        }
      }
    };

    fetchBookedSlots();
  }, [docInfo, selectedDate, docId, backendUrl]);

  // Generate available slots excluding the already booked slots
  const generateSlots = (date, bookedSlots = []) => {
    const slots = [];
    const startHour = 10; // 10 AM
    const endHour = 21; // 9 PM

    // Normalize booked slots for easy comparison
    const normalizedBookedSlots = bookedSlots.map(slot => {
      const [hour, minute] = slot.appointment_time.split(':');
      return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    });

    for (let hour = startHour; hour < endHour; hour++) {
      const slot1 = `${String(hour).padStart(2, '0')}:00`;
      const slot2 = `${String(hour).padStart(2, '0')}:30`;

      if (!normalizedBookedSlots.includes(slot1)) {
        slots.push(slot1);
      }
      if (!normalizedBookedSlots.includes(slot2)) {
        slots.push(slot2);
      }
    }
    setAvailableSlots(slots);
  };

  const handleBooking = async () => {
    if (!user_id) {
      navigate('/login');
      window.scrollTo(0, 0);
      return;
    }

    if (selectedSlot) {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const appointmentDetails = {
        doctor_id: docInfo.doctor_id,
        appointment_date: formattedDate,
        appointment_time: selectedSlot,
        user_id: user_id.user_id, // Corrected usage
        doctor_name: docInfo.name
      };
      console.log('Booking appointment:', appointmentDetails);

      try {
        const response = await fetch(`${backendUrl}/backend/appointments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentDetails),
        });

        if (response.ok) {
          setModalMessage(`Appointment booked on ${date.toDateString()} at ${selectedSlot} successfully! Please fill your details in the My profile section.`);
          setShowModal(true);
          // Optionally, you can refresh booked slots after booking
          // fetchBookedSlots(); // If fetchBookedSlots is accessible here
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book the appointment.');
      }
    } else {
      alert('Please select a time slot.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/my-appointments');
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  // Render loading state for doctor information
  if (!docInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      {/* Doctor Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={assets.doc_pic} // Use doctor image or placeholder
          alt={docInfo.name}
        />
        <h2 className="text-xl font-semibold mt-4">{docInfo.name}</h2>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <p className="mt-2">Appointment Fee: {currencySymbol}{docInfo.fees || 4000} </p>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-semibold text-green-600 mb-4">{modalMessage}</h3>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Booking Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Book Your Appointment</h3>

        {/* Date Selection */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="mb-4"
        />

        {/* Time Slots Selection */}
        <div className="mb-4">
          <label className="block mb-2">Available Time Slots:</label>
          {isFetchingSlots ? (
            <p className="text-gray-600">Fetching available slots...</p>
          ) : slotsError ? (
            <p className="text-red-500">Error: {slotsError}</p>
          ) : availableSlots.length > 0 ? (
            <div className="flex flex-wrap">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-4 py-2 border rounded mr-2 mb-2 ${
                    selectedSlot === slot
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No available slots for this date.</p>
          )}
        </div>

        {/* Book Now Button */}
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Appointment;
