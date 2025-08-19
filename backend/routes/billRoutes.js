const express = require('express');
const router = express.Router();

const { createBills, printBill } = require('../controllers/billController');

router.post('/bills', createBills);
router.get('/print/:billId', printBill);


module.exports = router;