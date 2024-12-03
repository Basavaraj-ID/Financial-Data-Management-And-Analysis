const mongoose = require("mongoose");
const connectDB = require("../../config/db.js");

describe("MongoDB Connection", () => {
  beforeAll(async () => {
    // Use the URI provided by @shelf/jest-mongodb
    const uri = process.env.MONGO_URI;
    await connectDB(uri);  // Connect using the mock URI
  });

  afterAll(async () => {
    await mongoose.connection.close();  // Close the connection after tests
  });

  it("should connect to the database successfully", () => {
    expect(mongoose.connection.readyState).toBe(1);  // 1 means connected
  });
});
