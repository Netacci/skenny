/* eslint-disable react/prop-types */
import { Input, Typography } from '@material-tailwind/react';

const Hero = ({ handleSearch }) => {
  return (
    <div className='relative bg-gradient-to-r from-blue-900 to-indigo-900 h-[450px] flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative z-10 text-center px-4'>
        <Typography
          variant='h1'
          color='white'
          className='mb-6 text-4xl md:text-6xl font-bold'
        >
          Find Your Dream Home
        </Typography>
        <Typography variant='lead' color='white' className='mb-12 opacity-80'>
          Discover the perfect property that fits your lifestyle
        </Typography>
        <div className='w-full mx-auto relative'>
          <Input
            type='text'
            placeholder='Search for properties...'
            className='pr-12 rounded-full bg-white/90 text-gray-900 border-none '
            labelProps={{
              className: 'hidden',
            }}
            containerProps={{
              className: 'min-w-0',
            }}
            onChange={handleSearch}
          />
          {/* <Button
          size='sm'
          color='orange'
          className='!absolute right-1 top-1 rounded-full'
        >
          <Search className='h-4 w-4' />
        </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
