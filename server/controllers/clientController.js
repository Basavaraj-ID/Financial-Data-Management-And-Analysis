const { fetchTransactions } = require("../services/transactionService.js");

const getTransactions = async (req, res) => {
  try {
    const { 
      page = 1, 
      pageSize = 10, 
      sort = null, 
      search = "", 
      fromDate = null, 
      toDate = null 
    } = req.query;

    const { transactions, totalCount } = await fetchTransactions({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      sort,
      search,
      fromDate,
      toDate,
    });

    res.status(200).json({ totalCount, transactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getTransactions };
