import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination: React.FC<PaginationProps> = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      renderOnZeroPageCount={null}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      forcePage={currentPage}
      containerClassName="flex space-x-2 overflow-x-auto"
      pageClassName="border rounded-md bg-tertiary hover:border-yellow-100 hover:text-green-100"
      activeClassName="border border-yellow-100 text-green-100"
      previousClassName="border rounded-md hover:border-yellow-100 hover:text-green-100"
      nextClassName="border rounded-md hover:border-yellow-100 hover:text-green-100"
      breakClassName="text-gray-100"
      disabledClassName="opacity-20 cursor-not-allowed pointer-events-none"
      // <a> spans the full area of the <li>
      pageLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      previousLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      nextLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      breakLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
    />
  );
};

export default memo(Pagination);
