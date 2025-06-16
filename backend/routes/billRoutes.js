const express = require('express');
const router = express.Router();

const billController = require('../controllers/billController');

router.post('/bills', billController.createBill);

module.exports = router;