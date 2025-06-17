const express = require('express');
const router = express.Router();

const { createBills } = require('../controllers/billController');

router.post('/bills', createBills);

module.exports = router;