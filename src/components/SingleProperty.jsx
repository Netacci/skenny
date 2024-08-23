/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { Card, Tooltip, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import ModalImage from 'react-modal-image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SingleProperty = ({ property }) => {
  const location = `${property?.address}, ${property?.city}, ${property?.state}, ${property?.country}`;
  return (
    <div className='flex flex-col  '>
      <div className='  mt-4'>
        <Typography className='text-blue-900 text-center font-bold text-2xl mb-6'>
          {property?.property_name}
        </Typography>
        <div className='w-[80%] mx-auto'>
          {' '}
          {/* <img
            src={property?.feature_image}
            className=' mx-auto w-[100%] object-fit object-cover h-[300px] '
            alt='Property'
          /> */}
          <ModalImage
            small={property?.feature_image}
            large={property?.feature_image}
            alt='Property'
            className=' mx-auto w-[100%] object-fit object-cover h-[300px] '
          />
        </div>
        {property?.property_images.length > 0 ? (
          <div className='mt-4 py-4   '>
            {' '}
            <Swiper
              centeredSlides={true}
              slidesPerView={'3'}
              spaceBetween={30}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className='object-cover object-fit mySwiper '
            >
              {property?.property_images?.map((image, index) => (
                <SwiperSlide
                  key={`${index}_${image}`}
                  className='bg-center bg-cover '
                >
                  <Card className=' '>
                    <img
                      className='block  '
                      src={image}
                      alt='property images'
                    />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
        <div>
          <div className=' justify-start w-[80%] mx-auto flex flex-wrap items-center gap-4 mt-4 '>
            {property?.property_details?.property_beds ? (
              <Tooltip
                content={`${property?.property_details?.property_beds} bedroom(s)`}
              >
                <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                  <Icon
                    icon='material-symbols:bed'
                    className='text-blue-950'
                    fontSize={24}
                  />
                </span>
              </Tooltip>
            ) : null}
            {property?.property_details?.property_toilets ? (
              <Tooltip
                content={`${property?.property_details?.property_toilets} toilet(s)`}
              >
                <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                  <Icon
                    icon='ph:toilet-fill'
                    className='text-blue-950'
                    fontSize={24}
                  />
                </span>
              </Tooltip>
            ) : null}
            {property?.property_details?.property_baths ? (
              <Tooltip
                content={`${property?.property_details?.property_baths} bathroom(s)`}
              >
                <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                  <Icon
                    icon='fa:bath'
                    className='text-blue-950'
                    fontSize={24}
                  />
                </span>
              </Tooltip>
            ) : null}
            {property?.property_details?.property_area ? (
              <Tooltip content={property?.property_details?.property_area}>
                <span className='cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5  text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70'>
                  <Icon
                    icon='carbon:area'
                    className='text-blue-950'
                    fontSize={24}
                  />
                </span>
              </Tooltip>
            ) : null}
          </div>
          <div className='flex lg:flex-row flex-col  mt-4 justify-between w-[80%] mx-auto'>
            <div className=''>
              {' '}
              <div>
                <Typography variant='h4' className='text-blue-900  mt-4'>
                  Description
                </Typography>
                <Typography className='text-blue-950  mt-4'>
                  {property?.property_description}
                </Typography>
              </div>
              <div>
                <Typography variant='h4' className='text-blue-900  mt-4'>
                  Location
                </Typography>
                <Typography className=' text-blue-950'>{location} </Typography>
              </div>
            </div>
            <div>
              <div>
                <Typography variant='h4' className='text-blue-900  mt-4'>
                  Property Type
                </Typography>
                <Typography className=' text-blue-950'>
                  {property?.property_details?.property_type}{' '}
                </Typography>
              </div>
              <div>
                <Typography variant='h4' className='text-blue-900  mt-4'>
                  Price
                </Typography>
                <Typography className=' text-blue-950'>
                  NGN {property?.property_details?.property_price}
                </Typography>
              </div>
            </div>
            <div className=''>
              <div>
                <Typography variant='h4' className='text-blue-900  mt-4'>
                  Realtor&apos;s contact details
                </Typography>
                <Typography className=' text-blue-950 mt-2'>
                  {property?.user?.first_name} {property?.user?.last_name}
                </Typography>
                <Typography className=' text-blue-950 mt-2'>
                  {property?.user?.phone_number}{' '}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
