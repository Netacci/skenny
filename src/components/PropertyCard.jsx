/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import { Bath, Bed, Eye, Heart, MapPin, Maximize } from 'lucide-react';
import { useState } from 'react';

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
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const location = `${city}, ${state}, ${country}`;
  const navigate = useNavigate();
  //  onClick={() => navigate(`${link}/${id}`)}
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <img
          className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={feature_image?.url}
          alt={property_name}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className='w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center'>
            <div className='w-16 h-16 bg-gray-300 rounded-full' />
          </div>
        )}

        {/* Overlay Actions */}
        <div className='absolute top-4 right-4 flex space-x-2'>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className='p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors'
          >
            <Heart
              size={20}
              className={
                isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }
            />
          </button>

          {realtor && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                statusColors[status] || statusColors.pending
              }`}
            >
              {property_details?.property_status}
            </div>
          )}
        </div>

        {/* Property Type Badge */}
        <div className='absolute bottom-4 left-4'>
          <span className='px-3 py-1 bg-gradient-to-r from-blue-600 to-orange-500 text-white text-sm font-semibold rounded-full'>
            {property_details?.property_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
          {property_name}
        </h3>

        <div className='flex items-center text-gray-600 mb-4'>
          <MapPin size={16} className='mr-1 flex-shrink-0' />
          <span className='text-sm truncate'>{location}</span>
        </div>

        {/* Price */}
        <div className='flex items-center mb-4'>
          <span className='text-sm text-gray-500 mr-1'>₦</span>
          <span className='text-2xl font-bold text-gray-900'>
            {property_details?.property_price > 0
              ? Intl.NumberFormat('en-US').format(
                  property_details.property_price
                )
              : 'Available on request'}
          </span>
        </div>

        {/* Property Details */}
        <div className='grid grid-cols-2 gap-3 mb-6'>
          <div className='flex items-center text-gray-600'>
            <Bed size={16} className='mr-2 text-blue-500' />
            <span className='text-sm'>
              {property_details?.property_beds || 0} beds
            </span>
          </div>
          <div className='flex items-center text-gray-600'>
            <Bath size={16} className='mr-2 text-blue-500' />
            <span className='text-sm'>
              {property_details?.property_baths || 0} baths
            </span>
          </div>
          <div className='flex items-center text-gray-600'>
            <Maximize size={16} className='mr-2 text-blue-500' />
            <span className='text-sm'>
              {property_details?.property_area || 0} sqft
            </span>
          </div>
          <div className='flex items-center text-gray-600'>
            <Eye size={16} className='mr-2 text-blue-500' />
            <span className='text-sm'>
              {property_details?.property_toilets || 0} toilets
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`${link}/${id}`)}
          className='w-full bg-blue-600  text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200'
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
