const express = require('express');
const { getTransactions } = require('../controllers/clientController.js');

const router = express.Router();

router.get("/transactions", getTransactions);

module.exports = router;
