/** @format */

const Transaction = require("../models/Transaction.js");
const { getLastYearDate } = require("../utils/helper.js");
const {
  MONTH_NAMES,
  GROUP_BY,
  SORT_STAGE,
} = require("../constants/constants.js");

const fetchFinancialData = async (granularity) => {
  const now = new Date();
  const lastYear = getLastYearDate();

  // Select the grouping stage based on granularity or fallback to "month"
  const groupStage = GROUP_BY[granularity] || GROUP_BY["month"];
  const dateFilter = granularity === "all" ? {} : { $gte: lastYear, $lte: now };

  const aggregatedData = await Transaction.aggregate([
    ...(granularity !== "all" ? [{ $match: { date: dateFilter } }] : []),
    {
      $group: {
        ...groupStage,
        totalIncome: {
          $sum: {
            $cond: [
              { $eq: ["$category", "Revenue"] },
              { $toDouble: "$amount" },
              0,
            ],
          },
        },
        totalExpenses: {
          $sum: {
            $cond: [
              { $eq: ["$category", "Expense"] },
              { $toDouble: "$amount" },
              0,
            ],
          },
        },
      },
    },
    {
      $sort: SORT_STAGE,
    },
  ]);

  // Restructure the data into the desired format
  const result = aggregatedData?.map((item) => {
    let id;

    // Determine ID format based on granularity
    if (granularity === "hour") {
      id = item._id.hour;
    } else if (granularity === "day") {
      id = item._id.date;
    } else if (granularity === "week") {
      id = `${item._id.year}-W${
        item._id.week < 10 ? "0" + item._id.week : item._id.week
      }`;
    } else if (granularity === "month") {
      const monthName = MONTH_NAMES[item._id.month - 1];
      id = `${monthName} ${item._id.year}`;
    } else if (granularity === "year" || granularity === "all") {
      id = item._id.year;
    }

    return {
      _id: id,
      totalIncome: item.totalIncome,
      totalExpenses: item.totalExpenses,
    };
  });

  return result;
};

module.exports = { fetchFinancialData };
