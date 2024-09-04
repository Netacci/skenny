/* eslint-disable react/prop-types */
import { Typography, Button } from '@material-tailwind/react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, link, realtor }) => {
  const {
    feature_image,
    property_name,
    property_details,
    state,
    country,
    city,
    // address,
    status,
    id,
  } = property;
  const location = `${city}, ${state}, ${country}`;
  const navigate = useNavigate();

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white'>
      <img
        className='w-full h-48 object-cover'
        src={feature_image}
        alt={property_name}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{property_name}</div>
        <p className='text-gray-700 text-base mb-2'>{location}</p>
        <div className='flex items-center mb-2'>
          <Icon
            icon='clarity:dollar-line'
            className='h-5 w-5 text-green-500 mr-1'
          />

          <span className='font-semibold text-lg'>
            {property_details?.property_price || 'Available on request'}
          </span>
        </div>
        <div className='flex justify-between items-center text-sm text-gray-600 gap-4'>
          <div className='flex items-center'>
            <Icon icon='ph:bed' className='h-4 w-4 mr-1' />
            <span>{property_details?.property_beds || 0} beds</span>
          </div>
          <div className='flex items-center'>
            <Icon icon='solar:bath-linear' className='h-4 w-4 mr-1' />
            <span>{property_details?.property_baths || 0} bath(s)</span>
          </div>
          <div className='flex items-center'>
            <Icon icon='hugeicons:toilet-01' className='h-4 w-4 mr-1' />
            <span>{property_details?.property_toilets || 0} toilet(s)</span>
          </div>
          <div className='flex items-center'>
            <Icon icon='lucide:maximize' className='h-4 w-4 mr-1' />
            <span>{property_details?.property_area || 0} sqft</span>
          </div>
        </div>
      </div>
      <div className='px-6 pt-4 pb-2 flex justify-between'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          {property_details?.property_type}
        </span>
        {/* <button className='float-right text-red-500 hover:text-red-600'>
          <Icon icon='ph:heart' className='h-6 w-6' />
        </button> */}
        {realtor ? (
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm capitalize mr-2 mb-2 ${
              status === 'pending'
                ? 'bg-yellow-800'
                : status === 'approved'
                ? 'bg-green-400'
                : 'bg-red-400'
            }`}
          >
            {status}
          </span>
        ) : null}
      </div>

      <div className='px-6 pb-4'>
        <Button
          onClick={() => navigate(`${link}/${id}`)}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
