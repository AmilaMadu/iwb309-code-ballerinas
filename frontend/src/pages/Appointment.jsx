import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useNavigate
import { AppContext } from '../Contexts/AppContext';
import { assets } from '../assets/assets';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const { user_id } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Fetch doctor information based on docId
  useEffect(() => {
    const doctor = doctors.find(doc => doc._id === docId);
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

        try {
          const response = await fetch(`http://localhost:9090/backend/booked_slots/${docId}/${formattedDate}`);
          if (response.ok) {
            const bookedSlots = await response.json();
            generateSlots(selectedDate, bookedSlots);
          } else {
            console.error("Error fetching booked slots");
          }
        } catch (error) {
          console.error("Error fetching booked slots:", error);
        }
      }
    };

    fetchBookedSlots();
  }, [docInfo, selectedDate]);

  // Generate available slots excluding the already booked slots
  const generateSlots = (date, bookedSlots = []) => {
    const slots = [];
    const startHour = 10; // 10 AM
    const endHour = 21; // 9 PM

    for (let hour = startHour; hour < endHour; hour++) {
      const slot1 = `${hour}:00`;
      const slot2 = `${hour}:30`;
      console.log("Booked Slots from API:", bookedSlots);
      const normalizeSlot = (slot) => {
        const [hour, minute] = slot.split(":");
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
      };
      
      // Only add slots that are not in the bookedSlots array
      if (!bookedSlots.map(normalizeSlot).includes(slot1)) {
        slots.push(slot1);
      }
      if (!bookedSlots.map(normalizeSlot).includes(slot2)) {
        slots.push(slot2);
      }
    }
    setAvailableSlots(slots);
  };

  const handleBooking = async () => {
    if (!user_id){
      // setModalMessage("Please login to book an appointment.");
      // setShowModal(true);
      // setShowModal(false);
      navigate('/login');
      window.scrollTo(0, 0);
    }
    else if (selectedSlot) {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const appointmentDetails = {
        doctor_id: docId,
        appointment_date: formattedDate,
        appointment_time: selectedSlot,
        user_id: user_id.user_id,
        doctor_name: docInfo.name
      };

      try {
        const response = await fetch("http://localhost:9090/backend/appointments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentDetails),
        });

        if (response.ok) {
          setModalMessage(`Appointment booked on ${selectedDate.toDateString()} at ${selectedSlot}`);
          setShowModal(true);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("Failed to book the appointment.");
      }
    } else {
      alert("Please select a time slot.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/my-appointments'); 
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  return docInfo ? (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <img className="w-32 h-32 rounded-full object-cover" src={assets.doc_pic} alt={docInfo.name} />
        <h2 className="text-xl font-semibold mt-4">{docInfo.name}</h2>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <p className="mt-2">Appointment Fee: {currencySymbol}{docInfo.fees}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-semibold text-green-600 mb-4">{modalMessage}</h3>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Book Your Appointment</h3>

        {/* Date Selection */}
        <Calendar onChange={setSelectedDate} value={selectedDate} className="mb-4" />

        {/* Time Slots Selection */}
        <div className="mb-4">
          <label className="block mb-2">Available Time Slots:</label>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 border rounded mr-2 mb-2 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                {slot}
              </button>
            ))
          ) : (
            <p>No available slots for this date.</p>
          )}
        </div>

        {/* Book Now Button */}
        <button onClick={handleBooking} className="bg-blue-500 text-white px-6 py-2 rounded">
          Book Now
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default Appointment;
