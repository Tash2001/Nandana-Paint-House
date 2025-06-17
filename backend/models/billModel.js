// models/billModel.js
const db = require('../db');

const createBill = (billData, items, callback) => {
  const {
    total_net_amount,
    discount,
    total_payable_value
  } = billData;

  db.run(`
    INSERT INTO bills ( total_net_amount, discount, total_payable_value)
    VALUES (?, ?, ?)
  `, [total_net_amount, discount, total_payable_value], function (err) {
    if (err) return callback(err);

    const billId = this.lastID;

    const stmt = db.prepare(`
      INSERT INTO bill_items (bill_id, product_id, quantity, price, item_discount, total)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const item of items) {
      stmt.run([
        billId,
        item.product_id,
        item.quantity,
        item.price,
        item.item_discount || 0,
        item.total
      ]);
    }

    stmt.finalize();
    callback(null, billId);
  });
};

module.exports = { createBill };
