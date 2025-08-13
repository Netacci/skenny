import { useState, useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, Plus, ChevronDown, LogOut, Settings, Eye, User } from 'lucide-react';
import { ROUTES } from '../../../utils/routes';

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { user } = useSelector((state) => state.auth);
const dropdownRef = useRef(null);
  // const path = useRouter();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };
console.log(openProfile)
  // console.log(path);
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navMenu = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    // { name: 'Properties', link: '/properties' },
    { name: 'Contact Us', link: '/contact' },
  ];
  // const navList = (
  //   <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
  //     {navMenu?.map((nav) => (
  //       <Typography
  //         as='li'
  //         variant='small'
  //         color='blue-gray'
  //         className='p-1 font-normal text-[16px]'
  //         key={nav.link}
  //       >
  //         <a href={nav.link} className='flex items-center'>
  //           {nav.name}
  //         </a>
  //       </Typography>
  //     ))}
  //   </ul>
  // );
  const profileMenuItems = [
    {
      label: 'My Profile',
      icon: User,
      click: () => navigate(ROUTES.profile),
    },
    {
      label: 'My Properties',
       icon: Eye,
      click: () => navigate(ROUTES.realtorsProperties),
    },
    {
      label: 'Settings',
     icon: Settings,
      click: () => navigate(ROUTES.settings),
    },
    {
      label: 'Sign Out',
   icon: LogOut,
      click: () => logout(),
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent'>
              SKENNY HEIGHTS
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-8'>
            {navMenu.map((item) => (
              <a
                key={item.link}
                href={item.link}
                className='text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium'
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className='hidden lg:flex items-center space-x-4'>
            {!user?.auth?.token ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className='px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors'
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className='px-6 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200'
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {user?.account_type === 'realtor' && (
                  <button
                    onClick={() => navigate(ROUTES.addNewListing)}
                    className='px-4 py-2 bg-blue-600 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2'
                  >
                    <Plus size={16} />
                    <span>Add Listing</span>
                  </button>
                )}

                <div className='relative' ref={dropdownRef}>
                  <button
                    onClick={() =>  setOpenProfile(!openProfile)}
                    className='flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer'
                  >
                    <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium'>
                      {user?.first_name?.[0]} {user?.last_name?.[0]}
                    </div>
                    <span className='text-sm font-medium text-gray-700'>
                      {user?.first_name}
                    </span>
                     <ChevronDown
                      size={16} 
                      className={`text-gray-500 transition-transform ${openProfile ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {openProfile && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1'>
                      {profileMenuItems.map((item) => (
                        <button
                          key={item.label}
                           onClick={() => {
                              item.click();
                              setOpenProfile(false);
                            }}
                          className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 transition-colors ${
                            item.isLast
                              ? 'text-red-600 hover:bg-red-50'
                              : 'text-gray-700'
                          }`}
                        >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpenNav(!openNav)}
            className='lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors'
          >
            {openNav ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {openNav && (
          <div className='lg:hidden py-4 border-t border-gray-100'>
            <div className='space-y-2'>
              {navMenu.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors'
                >
                  {item.name}
                </a>
              ))}

              {!user?.auth?.token ? (
                <div className='pt-4 space-y-2'>
                  <button
                    onClick={() => navigate('/login')}
                    className='w-full px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors text-left'
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className='w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-md'
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className='pt-4 space-y-2'>
                  {user?.account_type === 'realtor' && (
                    <button
                      onClick={() => navigate(ROUTES.addNewListing)}
                      className='w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-md flex items-center justify-center space-x-2'
                    >
                      <Plus size={16} />
                      <span>Add Listing</span>
                    </button>
                  )}

                  {profileMenuItems.map((item) => (
                    <button
                      key={item.label}
                      className={`w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-gray-50 rounded-md transition-colors ${
                        item.isLast
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-gray-700'
                      }`}
                    >
                      <item.icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
