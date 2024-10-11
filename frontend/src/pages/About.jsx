import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='px-6 lg:px-16 py-16 bg-gray-50'>
      
      {/* Section Header */}
      <div className='text-center'>
        <h2 className='text-4xl font-bold text-primary mb-4'>About <span className='text-gray-800'>Us</span></h2>
        <p className='text-lg text-gray-600'>Learn more about our mission, values, and why we strive for excellence.</p>
      </div>

      {/* About Section */}
      <div className='mt-12 flex flex-col md:flex-row gap-12 items-center'>
        <img className='w-full md:max-w-[400px] h-auto rounded-xl shadow-lg' src={assets.about_image} alt="About MedCare" />
        <div className='flex flex-col justify-center gap-6 text-gray-700 text-base'>
          <p>
            At <span className='font-semibold text-primary'>MedCare</span>, we are dedicated to making healthcare more accessible and convenient. Our platform connects patients with healthcare professionals through an intuitive and seamless system, simplifying the appointment booking process.
          </p>
          <p>
            We believe in using technology to enhance healthcare services. From personalized care recommendations to streamlined communication with doctors, MedCare is at the forefront of healthcare innovation.
          </p>
          <b className='text-primary'>Our Vision</b>
          <p>To create a world where healthcare is easy, accessible, and personalized for everyone.</p>
        </div>
      </div>
        </div>

  )
}

export default About
