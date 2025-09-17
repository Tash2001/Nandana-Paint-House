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

const getBill = async (billId) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM bills WHERE id = ?`, [billId], (err, row) => {
      if (err) reject(err);
      if (!row) return resolve(null);

      db.all(`Select bi.id as bill_item_id,bi.quantity ,bi.item_discount , bi.total,p.selling_price, p.id as product_id,p.name as product_name FROM bill_items bi JOIN products p ON bi.product_id = p.id WHERE bill_id =? `, [billId], (err, itemrow) => {
        if (err) return reject(err);

        row.items = itemrow;
        resolve(row);
      })
    });
  });
};

const updateBill = async (billId, bill, items) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // ✅ Update bills table
      db.run(
        `UPDATE bills 
         SET total_net_amount = ?, discount = ?, total_payable_value = ? 
         WHERE id = ?`,
        [bill.total_net_amount, bill.discount, bill.total_payable_value, billId],
        function (err) {
          if (err) return reject(err);

          // ✅ Delete old items
          db.run(`DELETE FROM bill_items WHERE bill_id = ?`, [billId], function (err) {
            if (err) return reject(err);

            // ✅ Insert new items
            const stmt = db.prepare(
              `INSERT INTO bill_items (bill_id, product_id, quantity, item_discount, total) 
               VALUES (?,?,?,?,?)`
            );

            items.forEach((item) => {
              stmt.run([
                billId,
                item.product_id,
                item.quantity,
                item.item_discount || 0,
                item.total,
              ]);
            });

            stmt.finalize((err) => {
              if (err) return reject(err);
              resolve({ billId, ...bill, items });
            });
          });
        }
      );
    });
  });
};


module.exports = { createBill, getBill, updateBill };
