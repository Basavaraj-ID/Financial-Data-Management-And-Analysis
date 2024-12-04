/** @format */

import { FC, memo } from "react";
import Search from "../Search";
import DateRangePicker from "../DateRangePicker";
import Pagination from "../Pagination";
import Table from "../Table";

const TableWithFilters: FC<TableWithFiltersProps> = ({
  title,
  searchProps,
  dateRangePickerProps,
  tableProps,
  paginationProps,
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Section */}
      <div className="flex flex-wrap gap-2 w-full">
        <h1 className="text-2xl font-semibold md:w-[25%] text-white">{title}</h1>
        {/* Search Component */}
        <div className="md:w-[70%] flex sm:justify-center flex-wrap gap-2">
          <div className="max-w-90">
            <Search {...searchProps} />
            {/* Date Range Picker */}
          </div>
          <DateRangePicker {...dateRangePickerProps} />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <Table {...tableProps} />
      </div>

      {/* Pagination Section */}
      <div className="flex justify-end">
        <Pagination {...paginationProps} />
      </div>
    </div>
  );
};

export default memo(TableWithFilters);
