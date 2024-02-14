import { Typography, Carousel } from '@material-tailwind/react';

const Hero = () => {
  return (
    <div className=' px-4 lg:px-14 py-12 flex gap-8 bg-[#fbe9e7] flex-col lg:flex-row'>
      <div className='lg:w-[80%] w-full'>
        <Typography
          variant='h2'
          color='blue-gray'
          className='mb-2 text-2xl lg:text-5xl'
        >
          Your dream home awaits you!
        </Typography>
        <Typography
          color='gray'
          className='font-medium text-[14px] lg:text-[16px] leading-7 mt-3'
        >
          At SKENNY HEIGHTS we are a new property Deal Sourceror, management and
          consultants in Property Investment Portfolios in the United Kingdom,
          with greater tracks in Africa (Nigeria); our team have a track record
          of turning property management challenges into a seamless solutions.
          Our goals are in tandem with the desires of all property investors;
          Maximizing Return On Investment (ROI) and we accomplish this task by
          applying exceptional property-management skills, all while ensuring
          Tenants satisfaction through top-notch property maintenance.
        </Typography>
      </div>
      <Carousel
        transition={{ duration: 2 }}
        autoplay={true}
        loop={true}
        className='rounded-xl'
      >
        <img
          src='/assets/sitting.jpeg'
          alt='sitting room'
          className='w-3/4 mx-auto '
        />
        <img
          src='/assets/outdoor.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto lg:h-[33rem] object-cover'
        />
        <img
          src='/assets/outdoor-overview.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto lg:h-[33rem] object-cover'
        />
        <img
          src='/assets/out.jpeg'
          alt='outdoor room'
          className='w-3/4 mx-auto  '
        />
        <img
          src='/assets/bath.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto lg:h-[33rem] object-cover'
        />
        <img
          src='/assets/bathroom.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto lg:h-[33rem] object-cover'
        />
      </Carousel>
    </div>
  );
};

export default Hero;
