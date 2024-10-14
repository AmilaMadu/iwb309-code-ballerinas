import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import { useContext } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeButton, setActiveButton] = useState(''); // State for active button
    const { user_id, setUserId } = useContext(AppContext);
    const dropdownRef = useRef(null); // Reference for dropdown to detect outside clicks

    const logout = () => {
        setUserId(false);
        localStorage.removeItem('user_id');
        setActiveButton('logout');
        navigate('/');
    };

    const handleNavigation = (route, buttonName) => {
        setActiveButton(buttonName);
        navigate(route);
        scrollTo(0, 0);
        setShowDropdown(false);
    };

    // Close dropdown if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate("/")} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>ALL DOCTORS</li>
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    user_id ? (
                        <div 
                            className='flex items-center gap-2 cursor-pointer relative' 
                            onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown on click
                            ref={dropdownRef}
                        >
                            <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
                            {showDropdown && (
                                <div className='absolute top-full right-0 mt-2 bg-white border rounded-md shadow-lg z-20 p-4 w-48'>
                                    <p 
                                        onClick={() => handleNavigation('my-profile', 'profile')}
                                        className={`cursor-pointer py-2 px-4 rounded-full transition-colors ${
                                            activeButton === 'profile' 
                                                ? 'bg-primary text-white' 
                                                : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                    >
                                        My Profile
                                    </p>
                                    <p 
                                        onClick={() => handleNavigation('my-appointments', 'appointments')}
                                        className={`cursor-pointer py-2 px-4 rounded-full transition-colors ${
                                            activeButton === 'appointments' 
                                                ? 'bg-primary text-white' 
                                                : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                    >
                                        My Appointments
                                    </p>
                                    <p 
                                        onClick={logout} 
                                        className={`cursor-pointer py-2 px-4 rounded-full transition-colors ${
                                            activeButton === 'logout' 
                                                ? 'bg-primary text-white' 
                                                : 'hover:bg-gray-200 hover:text-black'
                                        }`}
                                    >
                                        Logout
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => { navigate('/login'); scrollTo(0, 0); }} 
                            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
                        >
                            Create an Account
                        </button>
                    )
                }
                <img 
                    onClick={() => setShowMenu(true)} 
                    className='w-6 md:hidden' 
                    src={assets.menu_icon} 
                    alt="Menu Icon" 
                />
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} alt="Logo" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close Icon" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
