import { useRef, useState, useEffect, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Column } from "react-data-grid";
import useDebounce from "../../../hooks/useDebounce";
import TableWithFilters from "../../shared/TableWithFilters";
import { DEFAULT_PAGE_SIZE, SEARCH_FOR_ANYTHING_TEXT, TRANSACTIONS_TEXT } from "../../../utils/constants";
import { fetchTransactions } from "../../../utils/api/helpers";
import { getLastYearDate } from "../../../utils/helpers";

const TransactionsWithFilters = () => {
  // Search state for debouncing
  const [search, setSearch] = useState<string>("");
  // Debounce the search value with a 300ms delay
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  const now = new Date();
  const oneYearAgo = getLastYearDate();
  const [filters, setFilters] = useState<TransactionsFilterState>({
    search: debouncedSearch,
    startDate: oneYearAgo,
    endDate: now,
    currentPage: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortColumn: "date",
    sortDirection: "ASC",
  });

  const tableRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => fetchTransactions(filters),
    retry: 3,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleDateRangeChange = (newRange: { startDate: Date; endDate: Date }) => {
    setFilters((prev) => ({
      ...prev,
      startDate: newRange.startDate,
      endDate: newRange.endDate,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSortChange = (columnKey: string, sortDirection: "ASC" | "DESC" | "") => {
    setFilters((prev) => ({
      ...prev,
      sortColumn: columnKey,
      sortDirection: sortDirection,
    }));
  };

  const columns: Column<Transaction>[] = [
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={row.user_profile}
            alt="Profile"
            className="w-8 h-8 rounded-full"
            style={{ objectFit: "cover" }}
          />
          <span className="text-sm font-medium truncate">{row.user_id}</span>
        </div>
      ),
    },
    {
      key: "date",
      name: "Date",
      renderCell: ({ row }) => {
        const date = new Date(row.date);
        const formattedDate = `${date.toLocaleDateString("en-US", { weekday: "short" })}, ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "short" })} ${date.getFullYear()}`;
        
        return (
          <span className="text-sm">
            {formattedDate}
          </span>
        );
      }
    },
    {
      key: "amount",
      name: "Amount",
      sortable: true,
      renderCell: ({ row }) => {
        const isRevenue = row.category === "Revenue";
        const sign = isRevenue ? "+" : "-";
        const textColor = isRevenue ? "text-green-100" : "text-yellow-100";
      
        return (
          <span className={`text-sm font-semibold ${textColor}`}>
            {`${sign}$${Math.abs(row.amount)}`}
          </span>
        );
      }
      
    },
    {
      key: "status",
      name: "Status",
      sortable: true,
      renderCell: ({ row }: any) => {
        const isPaid = row.status === "Paid";
        const statusColor = isPaid ? "bg-green-100 bg-opacity-30 text-green-100" : "bg-yellow-100 bg-opacity-30 text-yellow-100";

        return (
          <div
            className={`flex items-center justify-center px-3 py-1 rounded-xl text-xs text-center max-w-24 ${statusColor}`}
          >
            {row.status}
          </div>
        );
      }
      
    },
  ];

  return (
    <div ref={tableRef}>
      <TableWithFilters
        title={TRANSACTIONS_TEXT}
        searchProps={{
          value: search,
          onChange: handleSearchChange,
          placeholder: SEARCH_FOR_ANYTHING_TEXT,
          textColor: "textSecondary",
        }}
        dateRangePickerProps={{
          onChange: handleDateRangeChange,
          initialStartDate: oneYearAgo,
          initialEndDate: now,
        }}
        tableProps={{
          data: data?.transactions || [],
          columns,
          onSortChange: handleSortChange,
          isLoading,
          error: error?.message,
        }}
        paginationProps={{
          pageCount: Math.ceil(data?.totalCount / filters.pageSize),
          currentPage: filters.currentPage - 1,
          onPageChange: handlePageChange

        }} />
    </div>
  );
};

export default memo(TransactionsWithFilters);
