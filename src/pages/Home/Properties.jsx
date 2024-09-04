/* eslint-disable react/prop-types */
import { Spinner, Typography } from '@material-tailwind/react';
import PropertyCard from '../../components/PropertyCard';
import NumberedPagination from '../../components/pagination/NumberedPagination';
import { useState } from 'react';

const Properties = ({ allProperties, loading, allMetadata, page, setPage }) => {
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (i, rowsPerPage) => {
    setPage(i + 1);
    setRowsPerPage(rowsPerPage);
  };
  const pageNumber = Math.ceil(allMetadata?.totalProperties / rowsPerPage);
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
    <div className='px-4 lg:px-14 mt-10 pb-4'>
      {' '}
      <Typography variant='h3' color='blue-gray' className='mb-2'>
        Listed properties
      </Typography>
      {loading ? (
        <div className='flex flex-col items-center justify-center '>
          <Spinner />
        </div>
      ) : allProperties?.length === 0 ? (
        <Typography className='text-center '>No properties found</Typography>
      ) : (
        <div className='flex flex-wrap gap-4 justify-center lg:justify-start'>
          {allProperties?.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              link={`/properties`}
            />
          ))}
        </div>
      )}
      <div className='mt-6'>
        <NumberedPagination
          currentPage={allMetadata?.currentPage}
          handlePrevPage={handlePrevPage}
          handleChangePage={handleChangePage}
          pageNumber={pageNumber}
          handleNextPage={() => handleNextPage(page, rowsPerPage)}
          rowsPerPage={rowsPerPage}
          total_count={allMetadata?.totalProperties}
        />
      </div>
      {/* <div className='text-center mx-auto my-6 w-max'>
        <a href='/properties'>
          <Button size='lg' color='deep-orange'>
            See All
          </Button>
        </a>
      </div> */}
    </div>
  );
};

export default Properties;
