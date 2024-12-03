const { getTransactions } = require('../../controllers/clientController');
const { fetchTransactions } = require('../../services/transactionService');

jest.mock('../../services/transactionService');

describe("Client Controller - getTransactions", () => {
  const mockRequest = (query) => ({ query });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
  };

  it("should fetch transactions and return a response", async () => {
    const req = mockRequest({
      page: 1,
      pageSize: 10,
      search: "Revenue",
      fromDate: "2024-01-01",
      toDate: "2024-02-01",
    });
    const res = mockResponse();

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

    await getTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
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

  it("should handle errors gracefully", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    fetchTransactions.mockRejectedValue(new Error("Fetch Error"));

    await getTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Fetch Error" });
  });
});
