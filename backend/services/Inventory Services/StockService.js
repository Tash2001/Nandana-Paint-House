const db = require('../../db.js');

// Insert or initialize stock for a product
function insertStockS(stock) {
    const updatedAt = new Date().toISOString();
    const sql = `
        INSERT INTO stock (product_id, quantity, updated_at)
        VALUES (?, ?, ?)
        ON CONFLICT(product_id) DO UPDATE SET 
            quantity = excluded.quantity,
            updated_at = excluded.updated_at
    `;
    return new Promise((resolve, reject) => {
        db.run(sql, [stock.product_id, stock.quantity, updatedAt], function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, ...stock, updated_at: updatedAt });
        });
    });
}

// Fetch all stock
function fetchStockS() {
    const sql = `
        SELECT s.*, p.name AS product_name
        FROM stock s
        JOIN products p ON s.product_id = p.id
    `;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Fetch stock by product
function fetchStockByProductS(productId) {
    const sql = `
        SELECT s.*, p.name AS product_name
        FROM stock s
        JOIN products p ON s.product_id = p.id
        WHERE s.product_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.get(sql, [productId], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

// Update stock quantity
function updateStockS(productId, quantity) {
    const updatedAt = new Date().toISOString();
    const sql = `
        UPDATE stock SET quantity = ?, updated_at = ? WHERE product_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.run(sql, [quantity, updatedAt, productId], function(err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Stock not found"));
            resolve({ product_id: productId, quantity, updated_at: updatedAt });
        });
    });
}

// Delete stock row
function deleteStockS(productId) {
    const sql = `DELETE FROM stock WHERE product_id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [productId], function(err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error("Stock not found"));
            resolve({ message: "Stock deleted successfully" });
        });
    });
}

module.exports = {
    insertStockS,
    fetchStockS,
    fetchStockByProductS,
    updateStockS,
    deleteStockS
};
