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
      pageClassName="border rounded-md bg-tertiary hover:bg-secondary hover:text-white"
      activeClassName="bg-secondary text-white"
      previousClassName="border rounded-md hover:bg-secondary hover:text-white"
      nextClassName="border rounded-md hover:bg-secondary hover:text-white"
      breakClassName="text-gray-500"
      disabledClassName="opacity-50 cursor-not-allowed"
      // <a> spans the full area of the <li>
      pageLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      previousLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      nextLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
      breakLinkClassName="flex items-center justify-center w-full h-full px-2 py-1 text-xs"
    />
  );
};

export default memo(Pagination);
