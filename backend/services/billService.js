// services/billService.js

const { createBill, getBill } = require("../models/billModel");

const createNewBill = (billData, items, callback) => {
    // Could add validations or calculations here in future
    createBill(billData, items, callback);
};

const getBillById = async (billId) => {

    return await getBill(billId);
};
module.exports = { createNewBill, getBillById };
