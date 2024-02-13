import { Typography } from '@material-tailwind/react';

const Gallery = () => {
  return (
    <div className='bg-[#f4f6f8] px-4 lg:px-14 py-12'>
      <Typography variant='h2' color='blue-gray' className='mb-2 text-center'>
        Ongoing projects
      </Typography>
      <Typography
        variant='p'
        color='blue-gray'
        className='mb-2 text-center text-[16px] w-1/2 mx-auto mt-6'
      >
        These are some of our ongoing projects in Nigeria, They are mostly
        clusters of our property development investment under build and sale.
        They are mostly clusters of our property development investment under
        build and sale.
      </Typography>
    </div>
  );
};

export default Gallery;
