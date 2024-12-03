/** @format */

import fetchData from "./fetchData";
import PATHS from "./path";

const { CLIENT_TRANSACTIONS, ANALYTICS_FINANCIAL_INFO } = PATHS;

export const fetchTransactions = async (filters: TransactionsFilterState) => {
  const {
    search,
    startDate,
    endDate,
    currentPage,
    pageSize,
    sortColumn,
    sortDirection,
  } = filters;

  const queryParams: GetTransactionsQueryParams = {
    search,
    page: currentPage,
    pageSize,
    sort: sortColumn
      ? JSON.stringify({ field: sortColumn, sort: sortDirection.toLowerCase() })
      : JSON.stringify({}),
  };

  if (startDate && !isNaN(startDate.getTime())) {
    queryParams.fromDate = startDate.toISOString();
  }

  if (endDate && !isNaN(endDate.getTime())) {
    queryParams.toDate = endDate.toISOString();
  }

  const response = await fetchData(CLIENT_TRANSACTIONS, queryParams);
  return response;
};

export const fetchLineGraphFinancialData = async (granularity: string) => {
  const response = await fetchData(ANALYTICS_FINANCIAL_INFO, {
    granularity,
  });
  return response;
};
