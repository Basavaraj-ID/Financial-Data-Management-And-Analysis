const { getFinancialData } = require('../../controllers/analyticsController');
const { fetchFinancialData } = require('../../services/analyticsService');

jest.mock('../../services/analyticsService');

describe("Analytics Controller - getFinancialData", () => {
  const mockRequest = (query) => ({ query });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
  };

  it("should fetch financial data and return a response", async () => {
    const req = mockRequest({ granularity: "month" });
    const res = mockResponse();

    fetchFinancialData.mockResolvedValue([
      { _id: "Jan 2024", totalIncome: 53100, totalExpenses: 2150 },
      { _id: "Feb 2024", totalIncome: 4300, totalExpenses: 35901 },
    ]);

    await getFinancialData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      month: [
        { _id: "Jan 2024", totalIncome: 53100, totalExpenses: 2150 },
        { _id: "Feb 2024", totalIncome: 4300, totalExpenses: 35901 },
      ],
    });
  });

  it("should handle errors gracefully", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    fetchFinancialData.mockRejectedValue(new Error("Service Error"));

    await getFinancialData(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Service Error" });
  });
});
