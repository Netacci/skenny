import { Typography, Carousel } from '@material-tailwind/react';

const Hero = () => {
  return (
    <div className=' px-4 lg:px-14 py-12 flex gap-8 bg-[#fbe9e7]'>
      <div className='w-[80%]'>
        <Typography variant='h1' color='blue-gray' className='mb-2'>
          Your dream home awaits you!
        </Typography>
        <Typography
          color='gray'
          className='font-medium text-[16px] leading-7 mt-3'
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
          src='src/assets/sitting.jpeg'
          alt='sitting room'
          className='w-3/4 mx-auto '
        />
        <img
          src='src/assets/outdoor.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto h-[33rem] object-cover'
        />
        <img
          src='src/assets/outdoor-overview.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto h-[33rem] object-cover'
        />
        <img
          src='src/assets/out.jpeg'
          alt='outdoor room'
          className='w-3/4 mx-auto  '
        />
        <img
          src='src/assets/bath.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto h-[33rem] object-cover'
        />
        <img
          src='src/assets/bathroom.jpeg'
          alt='image 2'
          className='w-3/4 mx-auto h-[33rem] object-cover'
        />
      </Carousel>
    </div>
  );
};

export default Hero;
