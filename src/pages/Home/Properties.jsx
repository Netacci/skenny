/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropertyCard from '../../components/PropertyCard';
import NumberedPagination from '../../components/pagination/NumberedPagination';
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { useSelector } from 'react-redux';

const Properties = ({ allProperties, loading, allMetadata, page, setPage }) => {
  // const [rowsPerPage, setRowsPerPage] = useState(20);

//   const handleChangePage = (i, rowsPerPage) => {
//     setPage(i + 1);
//     setRowsPerPage(rowsPerPage);
//   };
//   const pageNumber = Math.ceil(allMetadata?.totalProperties / rowsPerPage);
//   const handleNextPage = (totalPages) => {
//     if (page + 1 < totalPages + 1) {
//       setPage((prev) => prev + 1);
//     }
//   };
 const { user } = useSelector((state) => state.auth);
//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };
   const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    bedrooms: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const propertyTypes = ['all', 'Villa', 'Apartment', 'House'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₦100M', value: '0-100000000' },
    { label: '₦100M - ₦300M', value: '100000000-300000000' },
    { label: 'Above ₦300M', value: '300000000+' }
  ];
  return (
   <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Properties</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <span className="text-gray-700 font-medium">Found {allProperties.length} properties</span>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
          
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center space-x-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="lg:hidden mb-8 p-4 bg-white rounded-lg border border-gray-300">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : allProperties?.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {allProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                link="/properties"
                realtor={user?.account_type === 'realtor'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
