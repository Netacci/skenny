/* eslint-disable react/prop-types */

import PropertyCard from '../../../../components/PropertyCard';
import NumberedPagination from '../../../../components/pagination/NumberedPagination';
import { useState } from 'react';

const Properties = ({ properties, metadata, page, setPage }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (i, rowsPerPage) => {
    setPage(i + 1);
    setRowsPerPage(rowsPerPage);
  };
  const pageNumber = Math.ceil(metadata?.totalProperties / rowsPerPage);
  const handleNextPage = (totalPages) => {
    if (page + 1 < totalPages + 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className='px-4 py-2 lg:px-14 lg:py-4 '>
      <div className='flex flex-wrap gap-4 py-4'>
        {properties?.map((property) => {
          return (
            <PropertyCard
              key={property.id}
              property={property}
              link={`/realtor-properties`}
              realtor
            />
          );
        })}
      </div>
      <div className='mt-6'>
        <NumberedPagination
          currentPage={metadata?.currentPage}
          handlePrevPage={handlePrevPage}
          handleChangePage={handleChangePage}
          pageNumber={pageNumber}
          handleNextPage={() => handleNextPage(page, rowsPerPage)}
          rowsPerPage={rowsPerPage}
          total_count={metadata?.totalProperties}
        />
      </div>
    </div>
  );
};

export default Properties;
