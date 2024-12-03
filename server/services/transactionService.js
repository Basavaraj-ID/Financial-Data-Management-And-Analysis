const Transaction = require("../models/Transaction.js");
const { getLastYearDate } = require("../utils/helper.js")

const fetchTransactions = async ({ page, pageSize, sort, search, fromDate, toDate }) => {

  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    return {
      [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
    };
  };

  const sortFormatted = Boolean(sort) ? generateSort() : {};

  // Calculate the date range for one year ago from today
  const now = new Date();
  const oneYearAgo = getLastYearDate();

  //From one year ago to now, or use the provided fromDate and toDate
  const dateFilter = {
    $gte: fromDate ? new Date(fromDate) : oneYearAgo,
    $lte: toDate ? new Date(toDate) : now,
  };

  const filters = {
    $and: [
      { date: dateFilter },
      {
        $or: [
          { status: { $regex: search, $options: "i" } },
          { amount: { $regex: search, $options: "i" } },
        ],
      },
    ],
  };

  const transactions = await Transaction.find(filters)
    .select("-__v")
    .sort(sortFormatted)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  // Total document count for the filters
  const totalCount = await Transaction.countDocuments(filters);

  return { transactions, totalCount };
};

module.exports = { fetchTransactions };
