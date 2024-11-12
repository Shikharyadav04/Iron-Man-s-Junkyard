import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import Logout from './Logout';

const Navbar = () => {
  const { user } = useAuth();
  const [visible, setVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHomeClick = () => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'customer':
          navigate('/customer');
          break;
        case 'dealer':
          navigate('/dealer');
          break;
        default:
          navigate('/');
          break;
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className='flex items-center justify-evenly py-1 font-medium sticky top-0 w-full z-50 transition-shadow shadow-lg bg-gray-800 text-white'>
      <Link to='/'>
        <h1 className='h-5px w-6px bold py-5'>SCRAPMAN</h1>
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm'>
        <li className='flex flex-col items-center gap-1'>
          {user ? (
            user.role === 'admin' ? (
              <div 
                className='relative cursor-pointer'
                onMouseEnter={() => setAdminDropdownVisible(true)}
                onMouseLeave={() => setAdminDropdownVisible(false)}
              >
                <p>Admin</p>
                {adminDropdownVisible && (
                  <div className='absolute top-5 left-0 z-20 bg-gray-700 text-white py-2 rounded shadow-lg'>
                    <NavLink 
                      to='/admin' 
                      className='block px-4 py-2 hover:bg-gray-600'
                    >
                      Dashboard
                    </NavLink>
                    <NavLink 
                      to='/stats' 
                      className='block px-4 py-2 hover:bg-gray-600'
                    >
                      Stats
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <p onClick={handleHomeClick} className="cursor-pointer">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            )
          ) : (
            <p onClick={handleHomeClick} className="cursor-pointer">Home</p>
          )}
        </li>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>About</p>
        </NavLink>
        <NavLink to='/business' className='flex flex-col items-center gap-1'>
          <p>For Businesses</p>
        </NavLink>
        <NavLink to='/feedback' className='flex flex-col items-center gap-1'>
          <p>Feedback</p>
        </NavLink>
        <NavLink to='/SubscriptionPage' className='flex flex-col items-center gap-1'>
          <p>Subscription</p>
        </NavLink>
        <NavLink to='/news' className='flex flex-col items-center gap-1'>
          <p>News</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <div className='group relative navbar flex gap-5'>
          {user ? (
            <Logout />
          ) : (
            <>
              <img 
                className='w-5 cursor-pointer' 
                src={ assets.icon1 }
                alt="User Icon"
              />
              <div className='group-hover:block hidden absolute z-20 dropdown-menu right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                  <NavLink to='/login'>
                    <p className='cursor-pointer hover:text-black'>LogIn</p>
                  </NavLink>
                  <NavLink to='/register'>
                    <p className='cursor-pointer hover:text-black'>Register</p>
                  </NavLink>
                  <NavLink to='/dealerreg'>
                   <p className='cursor-pointer hover:text-black'>Register As Dealer</p>
                  </NavLink>
                </div>
              </div>
            </>
          )}
        </div>

        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='Menu' />

        <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ${visible ? 'w-full z-50' : 'w-0 overflow-hidden'} sm:hidden`}>
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
