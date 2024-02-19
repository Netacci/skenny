import { Typography, Carousel } from '@material-tailwind/react';

const Hero = () => {
  return (
    <div className=' px-4 lg:px-14 py-12 flex gap-8 bg-[#fbe9e7] flex-col lg:flex-row'>
      <div className='lg:w-[80%] w-full'>
        <Typography
          variant='h3'
          color='blue-gray'
          className='mb-2 text-xl lg:text-3xl'
        >
          LOOKING FOR PROPERTY INVESTMENT OPPORTUINITIES?
        </Typography>
        <Typography
          color='gray'
          className='font-medium text-[14px] lg:text-[16px] leading-7 mt-3'
        >
          At Skenny Properties our managerial skills are tailored to help
          investors or just one-off buyer navigate through the often difficult
          metrics of property business such as location, property pricing,
          rental yields, tenant demands, career opportunities, population and
          Buy-to-Let opportuinities.
        </Typography>
        <Typography
          color='gray'
          className='font-medium text-[14px] lg:text-[16px] leading-7 mt-3'
        >
          We make property investment a rewarding endeavor for property
          investors, be it a small scale one off or upscale corporations.
        </Typography>
        <Typography
          color='gray'
          className='font-medium text-[14px] lg:text-[16px] leading-7 mt-3'
        >
          Why not contact us today to begin that asset acquisition and wealth
          diversification quest and ultimately kickstarting your long term plan
          for early retirement?
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
