const db = require('../../db.js');

// Add a transaction (BUY or SELL)
function addTransaction(productId, type, quantity) {
    const transactionDate = new Date().toISOString();

    return new Promise((resolve, reject) => {
        // Insert into transactions
        const sql = `
            INSERT INTO transactions (product_id, type, quantity, transaction_date)
            VALUES (?, ?, ?, ?)
        `;

        db.run(sql, [productId, type, quantity, transactionDate], function(err) {
            if (err) return reject(err);

            // Update stock table
            const stockSql = `
                UPDATE stock
                SET quantity = CASE
                    WHEN ? = 'BUY' THEN quantity + ?
                    WHEN ? = 'SELL' THEN quantity - ?
                END,
                updated_at = ?
                WHERE product_id = ?
            `;

            db.run(stockSql, [type, quantity, type, quantity, transactionDate, productId], function(err2) {
                if (err2) return reject(err2);
                resolve({ id: this.lastID, productId, type, quantity, transactionDate });
            });
        });
    });
}

// Fetch all transactions
function fetchTransactions() {
    const sql = `
        SELECT t.*, p.name AS product_name
        FROM transactions t
        JOIN products p ON t.product_id = p.id
        ORDER BY t.transaction_date DESC
    `;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Fetch transactions by product
function fetchTransactionsByProduct(productId) {
    const sql = `
        SELECT t.*, p.name AS product_name
        FROM transactions t
        JOIN products p ON t.product_id = p.id
        WHERE t.product_id = ?
        ORDER BY t.transaction_date DESC
    `;
    return new Promise((resolve, reject) => {
        db.all(sql, [productId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    addTransaction,
    fetchTransactions,
    fetchTransactionsByProduct
};
