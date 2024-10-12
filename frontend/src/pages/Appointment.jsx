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
      // Only add slots that are not in the bookedSlots array
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
    if (selectedSlot) {
      const date = new Date(selectedDate);

      // Extract the year, month, and day
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      // Format the date as YYYY-MM-DD
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
          alert(`Appointment booked on ${selectedDate.toDateString()} at ${selectedSlot}`);
          navigate('/my-appointments');  // Redirect after successful booking
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

  return docInfo ? (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      {/* Doctor Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <img className="w-32 h-32 rounded-full object-cover" src={assets.doc_pic} alt={docInfo.name} />
        <h2 className="text-xl font-semibold mt-4">{docInfo.name}</h2>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <p className="mt-2">Appointment Fee: {currencySymbol}{docInfo.fees}</p>
      </div>

      {/* Booking Section */}
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
                className={`px-4 py-2 border rounded mr-2 mb-2 ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
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
