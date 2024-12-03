/** @format */

// Month Names
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Grouping logic for MongoDB aggregation
const GROUP_BY = {
  year: { _id: { year: { $year: "$date" } } },
  month: {
    _id: {
      year: { $year: "$date" },
      month: { $month: "$date" },
    },
  },
  week: {
    _id: {
      year: { $year: "$date" },
      week: { $isoWeek: "$date" },
    },
  },
  day: {
    _id: {
      date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
    },
  },
  hour: {
    _id: {
      hour: { $dateToString: { format: "%Y-%m-%dT%H:%M", date: "$date" } },
    },
  },
  all: {
    _id: { year: { $year: "$date" } },
  },
};

// Sort Stage for Aggregation
const SORT_STAGE = {
  "_id.year": 1,
  "_id.month": 1,
  "_id.week": 1,
  "_id.date": 1,
  "_id.hour": 1,
};

module.exports = {
  MONTH_NAMES,
  GROUP_BY,
  SORT_STAGE,
};
