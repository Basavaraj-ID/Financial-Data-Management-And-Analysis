const express = require('express');
const { getFinancialData } = require('../controllers/analyticsController.js');

const router = express.Router();

router.get('/financialInfo', getFinancialData);

module.exports = router;
