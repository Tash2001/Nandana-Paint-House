const express = require('express');
const router = express.Router();

const { createBills, printBill, updateBill } = require('../controllers/billController');

router.post('/bills', createBills);
router.get('/print/:billId', printBill);
router.put('/bills/:id', updateBill);


module.exports = router;