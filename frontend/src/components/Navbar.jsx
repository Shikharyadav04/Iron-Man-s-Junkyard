import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import Logout from './Logout';

const Navbar = () => {
  const { user } = useAuth(); // Get the user state from Auth context
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Listen for scroll events to add/remove shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`flex items-center justify-evenly py-1 font-medium sticky top-0 w-full z-50 transition-shadow ${isScrolled ? 'shadow-lg bg-[#1F2937] text-white' : 'bg-transparent text-black'}`}>
      <Link to='/'>
        <img src={assets.logo} className='w-20' alt="Logo" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>Home</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to='/buy' className='flex flex-col items-center gap-1'>
          <p>BUY</p>
        </NavLink>
        <NavLink to='/business' className='flex flex-col items-center gap-1'>
          <p>For Businesses</p>
        </NavLink>
        <NavLink to='/feedback' className='flex flex-col items-center gap-1'>
          <p>Feedback</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <div className='group relative navbar flex gap-5'>
          {user ? (
            <Logout /> // Show Logout button if user is logged in
          ) : (
            <>
              <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='Profile' />
              <div className='group-hover:block hidden absolute z-20 dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <NavLink to='/login'>
                    <p className='cursor-pointer hover:text-black'>LogIn</p>
                  </NavLink>
                  <NavLink to='/register'>
                    <p className='cursor-pointer hover:text-black'>Register</p>
                  </NavLink>
                </div>
              </div>
            </>
          )}

          {user && (
            <div className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              {user.role === "admin" && (
                <NavLink to='/admin'>
                  <p className='cursor-pointer hover:text-black'>Admin</p>
                </NavLink>
              )}
              {user.role === "customer" && (
                <NavLink to='/customer'>
                  <p className='cursor-pointer hover:text-black'>Customer</p>
                </NavLink>
              )}
              {user.role === "dealer" && (
                <NavLink to='/dealer'>
                  <p className='cursor-pointer hover:text-black'>Dealer</p>
                </NavLink>
              )}
            </div>
          )}
        </div>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu' />

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='Back' />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/buy'>BUY</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
