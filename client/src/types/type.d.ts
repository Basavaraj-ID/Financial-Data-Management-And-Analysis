/** @format */

// Shared component props
interface DateRangePickerProps {
  onChange: (ranges: { startDate: Date; endDate: Date }) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textColor?: string;
}

interface TableProps {
  data: any[]; // TODO: Update the data prop to use RowData
  columns: any[]; // TODO: Update columns to use RowData as a generic
  onSortChange: (
    sortColumn: string,
    sortDirection: "ASC" | "DESC" | ""
  ) => void;
  isLoading?: boolean;
  error?: string;
}

interface SortColumn {
  columnKey: string;
  direction: "ASC" | "DESC";
}

interface TableWithFiltersProps {
  title?: string;
  searchProps: SearchProps;
  dateRangePickerProps: DateRangePickerProps;
  tableProps: TableProps;
  paginationProps: PaginationProps;
}

// Dashboard props

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  amount: string | number;
}

// Transactions props
interface GetTransactionsQueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  fromDate?: string;
  toDate?: string;
}

interface LegendItem {
  title: string;
  color: string;
}

interface Transaction {
  _id: number;
  user_id: string;
  user_profile: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  category?: "Revenue" | "Expense";
}

interface TransactionsFilterState {
  search: string;
  startDate: Date | null;
  endDate: Date | null;
  currentPage: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: "ASC" | "DESC" | "";
}
