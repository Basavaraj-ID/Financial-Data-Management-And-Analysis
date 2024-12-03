const { fetchFinancialData } = require("../services/analyticsService.js");

const getFinancialData = async (req, res) => {
  try {
    const { granularity = "month" } = req.query; // Default to 'month' if not specified

    const financialData = await fetchFinancialData(granularity);

    res.status(200).json({ [granularity]: financialData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFinancialData };
