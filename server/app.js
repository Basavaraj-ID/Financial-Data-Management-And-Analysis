const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const clientRoutes = require('./routes/client.js');
const analyticsRoutes = require('./routes/analytics.js');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

// Routes
app.use("/client", clientRoutes);
app.use("/analytics", analyticsRoutes);

module.exports = app;
