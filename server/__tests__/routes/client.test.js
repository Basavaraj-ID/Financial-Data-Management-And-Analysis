const request = require('supertest');
const app = require('../../app');
const { fetchTransactions } = require('../../services/transactionService');

jest.mock('../../services/transactionService');

describe("Client Route - /client/transactions", () => {
  it("should return filtered transactions successfully", async () => {
    fetchTransactions.mockResolvedValue({
      transactions: [
        {
          _id: 1,
          date: "2024-01-15T08:34:12Z",
          amount: 1500.0,
          category: "Revenue",
          status: "Paid",
          user_id: "user_001",
          user_profile: "https://thispersondoesnotexist.com/",
        },
      ],
      totalCount: 1,
    });

    const response = await request(app).get('/client/transactions').query({
      page: 1,
      pageSize: 10,
      search: "Revenue",
      fromDate: "2024-01-01",
      toDate: "2024-02-01",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      transactions: [
        {
          _id: 1,
          date: "2024-01-15T08:34:12Z",
          amount: 1500.0,
          category: "Revenue",
          status: "Paid",
          user_id: "user_001",
          user_profile: "https://thispersondoesnotexist.com/",
        },
      ],
      totalCount: 1,
    });
  });

  it("should return 404 if service throws an error", async () => {
    fetchTransactions.mockRejectedValue(new Error("Database Error"));

    const response = await request(app).get('/client/transactions');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Database Error" });
  });
});
