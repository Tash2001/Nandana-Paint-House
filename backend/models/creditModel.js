// models/creditModel.js
const db = require('../db');

const addCreditCustomer = (data, callback) => {
    const { name, phone, bill_id, total_credit } = data;
    db.run(`
    INSERT INTO credit_customers (name, phone, bill_id, total_credit)
    VALUES (?, ?, ?, ?)
  `, [name, phone, bill_id, total_credit], function (err) {
        if (err) return callback(err);
        callback(null, this.lastID);
    });
};

// Pay credit and log payment history
const CreditModel = {
    // Record new credit payment
    insertPayment: (creditCustomerId, amount, callback) => {
        const now = new Date().toISOString();

        db.serialize(() => {
            db.run(`
        INSERT INTO credit_payments (credit_customer_id, amount_paid, paid_at)
        VALUES (?, ?, ?)
      `, [creditCustomerId, amount, now]);

            db.run(`
        UPDATE credit_customers
        SET 
          amount_paid = amount_paid + ?,
          last_paid_date = ?,
          status = CASE 
            WHEN total_credit - (amount_paid + ?) <= 0 THEN 'paid'
            ELSE 'unpaid'
          END
        WHERE id = ?
      `, [amount, now, amount, creditCustomerId], function (err) {
                callback(err, this?.changes);
            });
        });
    },

    // Get all credit customers
    getAllCreditCustomers: (callback) => {
        db.all(`SELECT * FROM credit_customers ORDER BY created_at DESC`, [], callback);
    },

    // Get payment history for a specific credit customer
    getPaymentHistory: (creditCustomerId, callback) => {
        db.all(`
      SELECT * FROM credit_payments 
      WHERE credit_customer_id = ?
      ORDER BY paid_at DESC
    `, [creditCustomerId], callback);
    }
};



module.exports = { addCreditCustomer, CreditModel };
