// services/billService.js

const { createBill, getBill, updateBill } = require("../models/billModel");

const createNewBill = (billData, items, callback) => {
    // Could add validations or calculations here in future
    createBill(billData, items, callback);
};

const getBillById = async (billId) => {

    return await getBill(billId);
};

const updateBill = async (billId, bill, items) => {

    return await updateBill(billId, bill, items);
};
module.exports = { createNewBill, getBillById, updateBill };
