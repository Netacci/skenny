import { Typography, Button } from '@material-tailwind/react';

const Banner = () => {
  return (
    <div className='bg-[rgba(10,34,51,.9)] px-4 lg:px-14 py-20 text-center'>
      {' '}
      <Typography
        variant='h2'
        color='white'
        className='mb-2 text-2xl lg:text-4xl'
      >
        Request a free consultation
      </Typography>
      <a href='mailto:info@skenny.org'>
        <Button className='mt-6' size='lg' color='deep-orange'>
          Send email
        </Button>
      </a>
    </div>
  );
};

export default Banner;
