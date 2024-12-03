/** @format */

import COLORS from "./enums/colors";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
export const DEFAULT_PAGE_SIZE = 10;

const { YELLOW, GREEN } = COLORS;

export const timePeriodOptions = [
  { value: "year", label: "Year" },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
  { value: "hour", label: "Hour" },
  { value: "all", label: "All" },
];

export const legends = [
  { title: "Income", color: YELLOW },
  { title: "Expenses", color: GREEN },
];

export const TRANSACTIONS_TEXT = "Transactions";
export const SEARCH_TEXT = "Search...."
export const SEARCH_FOR_ANYTHING_TEXT = "Search for anything...."
export const NO_DATA_AVAILABLE = "No data available"
export const OVERVIEW_TEXT = "Overview"
export const RECENT_TRANSACTIONS_TEXT = "Recent Transactions"
export const SEE_ALL_TEXT = "See all"