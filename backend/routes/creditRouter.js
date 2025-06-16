const express = require('express');
const router = express.Router();
const creditController = require('../controllers/creditController');

router.post('/credit', creditController.addCreditCustomer);
// Record a payment
router.post('/pay', creditController.creditController.payCredit);

// Get all credit customers
router.get('/customers', creditController.creditController.getAllCreditCustomers);

// Get payment history for a credit customer
router.get('/history/:id', creditController.creditController.getPaymentHistory);
module.exports = router;
