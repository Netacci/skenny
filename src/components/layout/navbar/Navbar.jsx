import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../../utils/routes';

const Nav = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const { user } = useSelector((state) => state.auth);

  // const path = useRouter();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

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
  const navList = (
    <ul className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      {navMenu?.map((nav) => (
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className='p-1 font-normal text-[16px]'
          key={nav.link}
        >
          <a href={nav.link} className='flex items-center'>
            {nav.name}
          </a>
        </Typography>
      ))}
    </ul>
  );
  const profileMenuItems = [
    {
      label: 'My Profile',
      // icon: UserCircleIcon,
      click: () => navigate(ROUTES.profile),
    },
    {
      label: 'My Properties',
      // icon: UserCircleIcon,
      click: () => navigate(ROUTES.realtorsProperties),
    },
    {
      label: 'Settings',
      // icon: UserCircleIcon,
      click: () => navigate(ROUTES.settings),
    },
    {
      label: 'Sign Out',
      // icon: PowerIcon,
      click: () => logout(),
    },
  ];

  return (
    <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-white/90 backdrop-blur-sm border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        <Typography
          as='a'
          href='/'
          className='mr-4 cursor-pointer py-1.5 font-bold text-2xl lg:text-3xl bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent hover:text-transparent'
        >
          SKENNY HEIGHTS
        </Typography>

        <div className='flex items-center gap-4'>
          <div className='mr-4 hidden lg:block'>{navList}</div>

          {!user?.auth?.token && (
            <div className='gap-2 hidden lg:flex'>
              <Button
                variant='text'
                size='sm'
                color='blue-gray'
                className='rounded-full'
                onClick={() => navigate(ROUTES.login)}
              >
                Log In
              </Button>
              <Button
                size='sm'
                className='rounded-full bg-gradient-to-r from-blue-600 to-orange-500'
                onClick={() => navigate(ROUTES.register)}
              >
                Sign Up
              </Button>
            </div>
          )}

          {user?.account_type === 'realtor' && (
            <div className='hidden lg:flex items-center gap-2'>
              <Button
                onClick={() => navigate(ROUTES.addNewListing)}
                className='rounded-full bg-gradient-to-r from-blue-600 to-orange-500'
                size='sm'
              >
                Add new listing
              </Button>

              <Menu
                open={openProfile}
                handler={setOpenProfile}
                placement='bottom-end'
              >
                <MenuHandler>
                  <Button
                    variant='text'
                    color='blue-gray'
                    className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
                  >
                    <Avatar
                      variant='circular'
                      size='sm'
                      alt='user'
                      className='border border-orange-500 p-0.5'
                      src='https://docs.material-tailwind.com/img/face-2.jpg'
                    />
                    <Typography className='text-sm font-normal'>
                      {user?.first_name}
                    </Typography>
                  </Button>
                </MenuHandler>
                <MenuList className='p-1'>
                  {profileMenuItems?.map(({ label, click }, key) => {
                    const isLastItem = key === profileMenuItems?.length - 1;
                    return (
                      <MenuItem
                        key={label}
                        onClick={click}
                        className={`flex items-center gap-2 rounded ${
                          isLastItem
                            ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                            : ''
                        }`}
                      >
                        <Typography
                          as='span'
                          variant='small'
                          className='font-normal'
                          color={isLastItem ? 'red' : 'inherit'}
                        >
                          {label}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          )}

          <IconButton
            variant='text'
            className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                className='h-6 w-6'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {navList}
        {!user?.auth?.token && (
          <div className='flex flex-col gap-2 mt-2'>
            <Button
              fullWidth
              variant='text'
              color='blue-gray'
              className='flex items-center gap-2'
              onClick={() => navigate(ROUTES.login)}
            >
              Log In
            </Button>
            <Button
              fullWidth
              className='bg-gradient-to-r from-blue-600 to-orange-500'
              onClick={() => navigate(ROUTES.register)}
            >
              Sign Up
            </Button>
          </div>
        )}
        {user?.account_type === 'realtor' && (
          <div className='flex flex-col gap-2 mt-2'>
            <Button
              fullWidth
              className='bg-gradient-to-r from-blue-600 to-orange-500'
              onClick={() => navigate(ROUTES.addNewListing)}
            >
              Add new listing
            </Button>
            {profileMenuItems?.map(({ label, click }, key) => (
              <Button
                key={key}
                fullWidth
                variant='text'
                color={
                  key === profileMenuItems?.length - 1 ? 'red' : 'blue-gray'
                }
                className='flex items-center gap-2 justify-start'
                onClick={click}
              >
                {label}
              </Button>
            ))}
          </div>
        )}
      </Collapse>
    </Navbar>
  );
};

export default Nav;
