/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtorProperties } from '../../../redux/realtor/propertiesSlice';
import { CheckCircle, Clock, Eye, Plus, Search, XCircle } from 'lucide-react';
import PropertyCard from '../../../components/PropertyCard';

const RealtorProperties = () => {
  const dispatch = useDispatch();
  const { properties, metadata, loading } = useSelector(
    (state) => state.properties
  );
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [propertyType, setPropertyType] = useState('');
 const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  useEffect(() => {
    dispatch(
      getRealtorProperties({
        search,
        page,
        limit,
        state,
        country,
        propertyType,
      })
    );
  }, [dispatch, search, page, limit, state, country, propertyType]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
 const filteredProperties = properties.filter(property => {
    const matchesSearch = property.property_name.toLowerCase().includes(search.toLowerCase()) ||
                         property.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesType = typeFilter === 'all' || property.property_details?.property_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusCounts = {
    all: properties.length,
    approved: properties.filter(p => p.status === 'approved').length,
    pending: properties.filter(p => p.status === 'pending').length,
    rejected: properties.filter(p => p.status === 'rejected').length,
  };

  // const propertyTypeList = [
  //   'House',
  //   'Apartment',
  //   'TownHouse',
  //   'PentHouse',
  //   'Bungalow',
  //   'Duplex',
  //   'Flat',
  //   'Land',
  //   'Office',
  // ];
  return (
    <Layout>
      <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 lg:px-8 py-8'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Properties</h1>
          <p className='text-gray-600'>Manage and track all your property listings</p>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Total Properties</p>
                <p className='text-2xl font-bold text-gray-900'>{statusCounts.all}</p>
              </div>
              <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'>
                <Eye className='text-blue-600' size={24} />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Approved</p>
                <p className='text-2xl font-bold text-green-600'>{statusCounts.approved}</p>
              </div>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                <CheckCircle className='text-green-600' size={24} />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Pending</p>
                <p className='text-2xl font-bold text-yellow-600'>{statusCounts.pending}</p>
              </div>
              <div className='w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center'>
                <Clock className='text-yellow-600' size={24} />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600 mb-1'>Rejected</p>
                <p className='text-2xl font-bold text-red-600'>{statusCounts.rejected}</p>
              </div>
              <div className='w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center'>
                <XCircle className='text-red-600' size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8'>
          <div className='flex flex-col lg:flex-row gap-4'>
            {/* Search Input */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
              <input
                type='text'
                placeholder='Search properties by name or location...'
                value={search}
                onChange={handleSearch}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            >
              <option value='all'>All Status</option>
              <option value='approved'>Approved</option>
              <option value='pending'>Pending</option>
              <option value='rejected'>Rejected</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className='px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
            >
              <option value='all'>All Types</option>
              <option value='Villa'>Villa</option>
              <option value='Apartment'>Apartment</option>
              <option value='House'>House</option>
            </select>

            {/* Add Property Button */}
            <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2'>
              <Plus size={20} />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className='flex justify-center items-center py-16'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100'>
            <div className='text-6xl mb-4'>🏠</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No properties found</h3>
            <p className='text-gray-600 mb-6'>
              {search || statusFilter !== 'all' || typeFilter !== 'all' 
                ? 'Try adjusting your filters or search criteria'
                : 'Start by adding your first property listing'
              }
            </p>
            <button className='px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 inline-flex items-center space-x-2'>
              <Plus size={20} />
              <span>Add Your First Property</span>
            </button>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className='mb-6'>
              <p className='text-gray-600'>
                Showing {filteredProperties.length} of {properties.length} properties
              </p>
            </div>

            {/* Properties Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
              {filteredProperties.map((property) => (
                <PropertyCard
                link="/realtor-properties"
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default RealtorProperties;
