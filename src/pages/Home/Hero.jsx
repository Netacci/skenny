/* eslint-disable react/prop-types */
import { Input, Typography } from '@material-tailwind/react';

const Hero = ({ handleSearch }) => {
  return (
    <div className=' px-4 lg:px-14 py-12  bg-[#00154d]  h-[350px]'>
      {' '}
      <Typography variant='h2' color='white' className='text-center  mt-10'>
        Find your new property
      </Typography>
      <div className='w-[50%] mt-6 mx-auto'>
        <Input
          label='Search property . . .'
          onChange={handleSearch}
          color='white'
        />
      </div>
    </div>
  );
};

export default Hero;
