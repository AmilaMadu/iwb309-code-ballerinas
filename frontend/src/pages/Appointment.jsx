import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../Components/RelatedDoctors';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  // Fetch doctor information based on docId
  useEffect(() => {
    const doctor = doctors.find(doc => doc._id === docId);
    setDocInfo(doctor || null);
  }, [doctors, docId]);

  // Generate available slots for the selected date
  const generateSlots = (date) => {
    const slots = [];
    const startHour = 10; // 10 AM
    const endHour = 21; // 9 PM

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    setAvailableSlots(slots);
  };

  useEffect(() => {
    if (docInfo) {
      generateSlots(selectedDate);
    }
  }, [docInfo, selectedDate]);

  const handleBooking = () => {
    if (selectedSlot) {
      alert(`Appointment booked on ${selectedDate.toDateString()} at ${selectedSlot}`);
    } else {
      alert('Please select a time slot.');
    }
  };

  return docInfo ? (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50">
      {/* Doctor Information */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <img className="w-32 h-32 rounded-full object-cover" src={assets.profile_pic} alt={docInfo.name} />
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
