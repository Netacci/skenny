/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { Card, Typography } from '@material-tailwind/react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import ModalImage from 'react-modal-image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SingleProperty = ({ property }) => {
  const location = `${property?.city}, ${property?.state}, ${property?.country}`;
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{property?.property_name}</h1>
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='md:w-2/3'>
          <ModalImage
            small={property?.feature_image}
            large={property?.feature_image}
            alt='Property feature image'
            className='w-full h-64 object-cover rounded-lg mb-4'
          />
          {property?.property_images?.length > 0 ? (
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
          <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Description</h2>
            <p>{property?.property_description}</p>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Property Features</h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center'>
                {/* <Home className='mr-2' /> */}
                <Icon icon='ph:bed' className='mr-2' />
                <span>
                  {property?.property_details?.property_beds || 0} Rooms
                </span>
              </div>
              <div className='flex items-center'>
                {/* <Bath className='mr-2' /> */}
                <Icon icon='solar:bath-linear' className='mr-2' />
                <span>{property?.property_details.baths || 0} Bathroom(s)</span>
              </div>
              <div className='flex items-center'>
                {/* <Bath className='mr-2' /> */}
                <Icon icon='hugeicons:toilet-01' className='mr-2' />
                <span>
                  {property?.property_details?.property_toilets || 0} Toilet(s)
                </span>
              </div>
              <div className='flex items-center'>
                <Icon icon='lucide:maximize' className='mr-2' />
                <span>
                  {property?.property_details?.property_area || 0} sqft
                </span>
              </div>
              <div className='flex items-center'>
                <Icon icon='ph:map-pin-light' className='mr-2' />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className='md:w-1/3'>
          <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Price</h2>
            <div className='text-3xl font-bold text-blue-600 flex items-center'>
              <Icon icon='clarity:dollar-line' />
              <span>{property?.property_details?.property_price || 0.0}</span>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
            <h2 className='text-xl font-semibold mb-2'>
              Realtor&apos;s Contact Details
            </h2>
            <Typography className='mb-2'>
              {property?.user?.first_name} {property?.user?.last_name}
            </Typography>
            <div className='flex items-center mb-2'>
              <Icon icon='iconoir:phone' className='mr-2' />
              <span>{property?.user?.phone_number}</span>
            </div>
            <div className='flex items-center'>
              <Icon icon='material-symbols:mail-outline' className='mr-2' />
              <span>{property?.user?.email}</span>
            </div>
          </div>
          <button className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300'>
            <Icon icon='ph:calendar-light' className='inline mr-2' />
            Schedule Viewing
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
