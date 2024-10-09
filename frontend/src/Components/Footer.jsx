import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { assets } from '../assets/assets';

const Footer = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Function to handle link clicks
  const handleLinkClick = (path) => {
    navigate(path); // Navigate to the specified path
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* ----------Left Section--------*/}
        <div> 
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          At MedCare, we strive to simplify your appointment scheduling experience. Our platform connects you with qualified healthcare professionals tailored to your needs, 
        ensuring you receive the best possible care. Join us in revolutionizing the way appointments are made!
          </p>
        </div>

        {/* ----------Center Section--------*/}
        <div>
          <p className='text-xl font-medium mb-5'>MedCare</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>
              <Link to="/" onClick={() => handleLinkClick("/")} className='hover:underline'>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => handleLinkClick("/about")} className='hover:underline'>About Us</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => handleLinkClick("/contact")} className='hover:underline'>Contact Us</Link>
            </li>
            <li>
            <Link to="/privacy-policy" onClick={() => handleLinkClick("/privacy-policy")} className='hover:underline'>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* ----------Right Section--------*/}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+94 70 24050126</li>
            <li>codeballerinas@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* -------- Copyright text --------*/}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2024@ Code_Balllerinas - All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
