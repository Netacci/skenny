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
    <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-14 lg:py-4'>
      <div className='flex items-center justify-between text-blue-gray-900'>
        <Typography
          as='a'
          href='#'
          className='mr-2 lg:mr-4 cursor-pointer py-1.5 font-bold text-xl lg:text-3xl'
          color='deep-orange'
        >
          SKENNY HEIGHTS
        </Typography>

        <div className='flex items-center lg:gap-4'>
          {user?.auth?.token ? (
            <Typography className='mr-2'>
              Welcome, {user?.first_name}
            </Typography>
          ) : (
            <div className='mr-4 hidden lg:block'>{navList}</div>
          )}

          {/* These buttons will not show if user is already logged in or if realtor is logged in */}
          {user?.auth?.token ? null : (
            <div className=' gap-2 hidden lg:flex'>
              <Button
                color='deep-orange'
                onClick={() => navigate(ROUTES.register)}
              >
                Register
              </Button>
              <Button
                onClick={() => navigate(ROUTES.login)}
                color='deep-orange'
              >
                Login
              </Button>
            </div>
          )}
          {/* This div will be seen by only realtors and won't be shown if theey aren't authneticateed*/}
          {user?.account_type === 'realtor' ? (
            <div className=' hidden lg:flex items-center gap-2'>
              <Button
                onClick={() => navigate(ROUTES.addNewListing)}
                color='deep-orange'
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
                    className='flex items-center rounded-full p-0'
                  >
                    <Avatar
                      variant='circular'
                      size='md'
                      alt='tania andrew'
                      withBorder={true}
                      color='blue-gray'
                      className=' p-0.5'
                      src='https://docs.material-tailwind.com/img/face-2.jpg'
                    />
                  </Button>
                </MenuHandler>
                <MenuList className='p-1 hidden lg:block'>
                  {profileMenuItems.map(({ label, click }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                      <MenuItem
                        key={label}
                        onClick={click}
                        className={`flex items-center gap-2 rounded  ${
                          isLastItem
                            ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 '
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
          ) : null}
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
        {user?.auth?.token ? null : <div>{navList}</div>}
        {user?.auth?.token ? null : (
          <div className=' gap-2 flex'>
            <Button
              color='deep-orange'
              onClick={() => navigate(ROUTES.register)}
            >
              Register
            </Button>
            <Button onClick={() => navigate(ROUTES.login)} color='deep-orange'>
              Login
            </Button>
          </div>
        )}
        {user?.account_type === 'realtor' ? (
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => navigate(ROUTES.addNewListing)}
              color='deep-orange'
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
                  className='flex items-center rounded-full p-0'
                >
                  <Avatar
                    variant='circular'
                    size='md'
                    alt='tania andrew'
                    withBorder={true}
                    color='blue-gray'
                    className=' p-0.5'
                    src='https://docs.material-tailwind.com/img/face-2.jpg'
                  />
                </Button>
              </MenuHandler>
              <MenuList className='p-1 lg:hidden'>
                {profileMenuItems.map(({ label, click }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={click}
                      className={`flex items-center gap-2 rounded  ${
                        isLastItem
                          ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 '
                          : ''
                      }`}
                    >
                      {/* {React.createElement(icon, {
                      className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                      strokeWidth: 2,
                    })} */}
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
        ) : null}
      </Collapse>
    </Navbar>
  );
};

export default Nav;
