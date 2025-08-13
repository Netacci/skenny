/* eslint-disable react/prop-types */


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from 'react';
import { Bath, Bed,  ChevronLeft, ChevronRight, Eye, Heart, Mail, MapPin, Maximize, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SingleProperty = ({ property }) => {
  const location = `${property?.city}, ${property?.state}, ${property?.country}`;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  const allImages = [
    property?.feature_image,
    ...(property?.property_images || [])
  ].filter(Boolean);

   const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  return (
   <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {property?.property_name}
              </h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={20} className="mr-2" />
                <span className="text-lg">{location}</span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0">
              <div className="text-3xl font-bold text-blue-600 flex items-center">
                <span className="text-2xl mr-1">₦</span>
                {Intl.NumberFormat('en-US').format(
                  property?.property_details?.property_price || 0
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {allImages.length > 0 && (
                <div className="relative">
                  <img
                    src={allImages[currentImageIndex]?.url}
                    alt="Property"
                    className="w-full h-96 object-cover"
                  />
                  
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              
              {allImages.length > 1 && (
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-2">
                    {allImages.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative rounded-lg overflow-hidden aspect-square ${
                          currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                        }`}
                      >
                        <img
                          src={image?.url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {index === 3 && allImages.length > 4 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-semibold">+{allImages.length - 4}</span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Features */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Bed className="mx-auto mb-2 text-blue-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {property?.property_details?.property_beds || 0}
                  </div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Bath className="mx-auto mb-2 text-green-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {property?.property_details?.property_baths || 0}
                  </div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Eye className="mx-auto mb-2 text-purple-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {property?.property_details?.property_toilets || 0}
                  </div>
                  <div className="text-gray-600">Toilets</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Maximize className="mx-auto mb-2 text-orange-600" size={32} />
                  <div className="text-2xl font-bold text-gray-900">
                    {property?.property_details?.property_area || 0}
                  </div>
                  <div className="text-gray-600">Sq ft</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {property?.property_description || 'No description available.'}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Swimming Pool',
                  'Gym',
                  'Parking',
                  'Security',
                  'Garden',
                  'Air Conditioning',
                  'WiFi',
                  'Elevator',
                  'Balcony'
                ].map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 flex items-center justify-center">
                  <span className="text-2xl mr-1">₦</span>
                  {Intl.NumberFormat('en-US').format(
                    property?.property_details?.property_price || 0
                  )}
                </div>
                <p className="text-gray-600 mt-1">Total Price</p>
              </div>

              {/* Contact Form */}
              <div className="space-y-4">
                <button onClick={()=>navigate('/lease-property')} className="w-full bg-blue-600  text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  {/* <Calendar size={20} /> */}
                  <span>Lease Property</span>
                </button>
                
                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Heart size={20} />
                  <span>Save Property</span>
                </button>
              </div>
            </div>

            {/* Realtor Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Agent</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {property?.user?.first_name?.[0]}{property?.user?.last_name?.[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {property?.user?.first_name} {property?.user?.last_name}
                  </div>
                  <div className="text-sm text-gray-600">Licensed Realtor</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-blue-600" />
                  <span className="text-gray-700">{property?.user?.phone_number}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-blue-600" />
                  <span className="text-gray-700">{property?.user?.email}</span>
                </div>
              </div>

              {/* <button className="w-full mt-4 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                View Agent Profile
              </button> */}
            </div>

            {/* Similar Properties */}
            {/* <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {mockProperties.slice(1, 3).map((similarProperty) => (
                  <div key={similarProperty.id} className="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <img
                      src={similarProperty.feature_image?.url}
                      alt={similarProperty.property_name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {similarProperty.property_name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {similarProperty.city}, {similarProperty.state}
                      </div>
                      <div className="text-sm font-semibold text-blue-600">
                        ₦{Intl.NumberFormat('en-US').format(similarProperty.property_details?.property_price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
