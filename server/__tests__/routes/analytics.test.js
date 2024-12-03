const request = require('supertest');
const app = require('../../app');
const { fetchFinancialData } = require('../../services/analyticsService');

jest.mock('../../services/analyticsService');

describe("Analytics Route - /analytics/financialInfo", () => {
  it("should return monthly financial data", async () => {
    fetchFinancialData.mockResolvedValue([
      { _id: "Jan 2024", totalIncome: 53100, totalExpenses: 2150 },
      { _id: "Feb 2024", totalIncome: 4300, totalExpenses: 35901 },
    ]);

    const response = await request(app).get('/analytics/financialInfo').query({
      granularity: "month",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      month: [
        { _id: "Jan 2024", totalIncome: 53100, totalExpenses: 2150 },
        { _id: "Feb 2024", totalIncome: 4300, totalExpenses: 35901 },
      ],
    });
  });

  it("should handle errors gracefully", async () => {
    fetchFinancialData.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get('/analytics/financialInfo');

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ message: "Service Error" });
  });
});
