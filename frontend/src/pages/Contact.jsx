import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className='px-6 lg:px-16 py-16 bg-gray-50'>
      {/* Section Header */}
      <div className='text-center'>
        <h2 className='text-4xl font-bold text-primary mb-4'>Contact <span className='text-gray-800'>Us</span></h2>
        <p className='text-lg text-gray-600'>We are here to assist you. Feel free to reach out to us anytime!</p>
      </div>

      {/* Contact Section */}
      <div className='mt-12 flex flex-col md:flex-row gap-8 items-center justify-center'> {/* Centering the flex items */}
        <img className='w-full md:max-w-[400px] h-auto rounded-xl shadow-lg mb-4' src={assets.contact_image} alt="Contact MedCare" /> {/* Added bottom margin for spacing */}
        <div className='flex flex-col justify-center gap-4 text-gray-700 text-base'> {/* Reduced gap */}
          <div>
            <p className='font-semibold text-lg text-primary'>Our Location</p>
            <p>University of Moratuwa, <br /> Bandaranayaka Mawatha, Moratuwa, Sri Lanka</p>
          </div>

          <div>
            <p className='font-semibold text-lg text-primary'>Contact Details</p>
            <p>Tel: <a href="tel:+94702450126" className='text-primary hover:underline'>+94 70 2450126</a><br />
            Email: <a href="mailto:codeballerinas@gmail.com" className='text-primary hover:underline'>codeballerinas@gmail.com</a></p>
          </div>

          <div>
            <p className='font-semibold text-lg text-primary'>Working Hours</p>
            <p>Monday - Friday: 8 AM - 6 PM <br /> Saturday: 9 AM - 2 PM</p>
          </div>
        </div>
      </div>

      {/* Map Embed (Optional) */}
      <div className='mt-16'>
        <iframe 
          className='w-full h-64 rounded-lg shadow-md'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.2757980745694!2d79.89974561565397!3d6.79793799508665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24717a23e12d7%3A0x927fdb7a26f94f82!2sUniversity%20of%20Moratuwa!5e0!3m2!1sen!2slk!4v1631606571232!5m2!1sen!2slk"
          allowFullScreen='' loading='lazy' title='University of Moratuwa Location'></iframe>
      </div>
    </div>
  );
}

export default Contact;
