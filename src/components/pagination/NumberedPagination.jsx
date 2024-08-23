/* eslint-disable react/prop-types */

import { Icon } from '@iconify/react';
import { Button, Typography } from '@material-tailwind/react';

const NumberedPagination = ({
  currentPage,
  handlePrevPage,
  handleChangePage,
  pageNumber,
  handleNextPage,
  rowsPerPage,
  total_count,
}) => {
  return (
    <div className='flex items-center justify-between p-[6px] border-t-[1px] border-[#EBECF0] '>
      <div className='flex items-center  '>
        <Icon
          icon='mdi:chevron-left'
          fontSize={24}
          className={`${currentPage > 1 ? '#526581' : '#8491A5'}`}
          onClick={() => handlePrevPage(rowsPerPage)}
        />

        {Array?.from(Array(pageNumber || 0), (_, i) => {
          if (
            i === 0 ||
            i === pageNumber - 1 ||
            Math.abs(currentPage - i) <= 2 ||
            i === currentPage - 3 ||
            i === currentPage + 2
          ) {
            // Display first page, last page, current page, and pages around the current page
            return (
              <Button
                className={`${
                  currentPage === i + 1 ? 'bg-[#F3F2F8]' : ''
                } text-[#526581] text-[16px] font-[400] w-[30px] h-[30px] rounded-[4px] p-0 mr-2 cursor-pointer`}
                onClick={() => handleChangePage(i, rowsPerPage)}
                key={`page-${i}`}
              >
                {i + 1}
              </Button>
            );
          } else if (i === currentPage - 4 || i === currentPage + 3) {
            // Display ellipsis for skipped pages
            return <Typography key={`ellipsis-${i}`}>...</Typography>;
          } else {
            return null;
          }
        })}
        <Icon
          icon='mdi:chevron-right'
          fontSize={24}
          className={`${currentPage + 1 < pageNumber ? '#526581' : '#8491A5'}`}
          onClick={() => handleNextPage(pageNumber)}
        />
      </div>
      <div>
        <Typography className='text-[16px]'>
          {total_count || 0} Total records
        </Typography>
      </div>
    </div>
  );
};

export default NumberedPagination;
