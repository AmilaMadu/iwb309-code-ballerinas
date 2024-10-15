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
    <div className='bg-gray-800 text-white md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-8 my-10 mt-40 text-sm p-10'>
        {/* ----------Left Section--------*/}
        <div> 
          <img className='mb-5 w-40' src={assets.logo} alt="MedCare Logo" />
          <p className='w-full md:w-2/3 text-gray-300 leading-6'>
            At MedCare, we strive to simplify your appointment scheduling experience. Our platform connects you with qualified healthcare professionals tailored to your needs, ensuring you receive the best possible care. Join us in revolutionizing the way appointments are made!
          </p>
        </div>

        {/* ----------Center Section--------*/}
        <div>
          <p className='text-xl font-medium mb-5'>MedCare</p>
          <ul className='flex flex-col gap-2 text-gray-300'>
            <li>
              <Link to="/" onClick={() => handleLinkClick("/")} className='hover:underline hover:text-blue-300'>Home</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => handleLinkClick("/about")} className='hover:underline hover:text-blue-300'>About Us</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => handleLinkClick("/contact")} className='hover:underline hover:text-blue-300'>Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy" onClick={() => handleLinkClick("/privacy-policy")} className='hover:underline hover:text-blue-300'>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* ----------Right Section--------*/}
        <div>
          <p className='text-xl font-medium mb-5'>Get in Touch</p>
          <ul className='flex flex-col gap-2 text-gray-300'>
            <li>
              <a href="tel:+947024050126" className="hover:underline hover:text-blue-300">📞 +94 70 24050126</a>
            </li>
            <li>
              <a href="mailto:codeballerinas@gmail.com" className="hover:underline hover:text-blue-300">✉️ codeballerinas@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* -------- Copyright text --------*/}
      <div className="text-center py-5">
        <hr className='border-gray-700' />
        <p className='py-5 text-sm'>
          Copyright &copy; 2024 Code_Ballerinas - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;