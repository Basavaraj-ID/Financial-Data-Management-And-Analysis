const app = require('./app.js');
const connectDB = require('./config/db.js');
// const fs = require("fs");
// const path = require("path");
// const Transaction = require('./models/Transaction.js');

// const transactionsPath = path.resolve(__dirname, "data/transactions.json");
// const rawdata = fs.readFileSync(transactionsPath);
// let transactionData = JSON.parse(rawdata.toString());

const PORT = process.env.PORT || 9000;

// Connect to MongoDB and start server
connectDB()
  .then(() => {
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
      // Insert transaction data into the database
    // Transaction.insertMany(transactionData)
    //   .then(() => console.log("Transaction data inserted successfully"))
    //   .catch((err) => console.error("Error inserting transaction data:", err));
  })
  .catch((err) => {
    console.error("Failed to connect to the database. Server not started.", err);
    process.exit(1); // Exit the process with a failure code
  });