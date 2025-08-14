const db = require('../../db.js');

// Create product
function insertProductS(product) {
    const createdAt = new Date().toISOString();
    const sql = `
        INSERT INTO products 
        (name, brand_id, supplier_id, category_id, subcategory_id, unit_id, color_id, purchase_price, selling_price, description, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        db.run(sql, [
            product.name, product.brand_id, product.supplier_id,
            product.category_id, product.subcategory_id, product.unit_id,
            product.color_id || null, product.purchase_price, product.selling_price,
            product.description || null, createdAt, createdAt
        ], function(err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, ...product });
        });
    });
}

// Fetch all products with joined parameter names
function fetchProductsS() {
    const sql = `
        SELECT p.*, 
               b.name AS brand_name,
               s.name AS supplier_name,
               c.name AS category_name,
               sc.name AS subcategory_name,
               u.name AS unit_name,
               co.name AS color_name
        FROM products p
        JOIN brands b ON p.brand_id = b.id
        JOIN suppliers s ON p.supplier_id = s.id
        JOIN categories c ON p.category_id = c.id
        JOIN subcategories sc ON p.subcategory_id = sc.id
        JOIN units u ON p.unit_id = u.id
        LEFT JOIN colors co ON p.color_id = co.id
    `;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Update product
function updateProductS(id, product) {
    const updatedAt = new Date().toISOString();
    const sql = `
        UPDATE products
        SET name=?, brand_id=?, supplier_id=?, category_id=?, subcategory_id=?,
            unit_id=?, color_id=?, purchase_price=?, selling_price=?, description=?, updated_at=?
        WHERE id=?
    `;
    return new Promise((resolve, reject) => {
        db.run(sql, [
            product.name, product.brand_id, product.supplier_id,
            product.category_id, product.subcategory_id, product.unit_id,
            product.color_id || null, product.purchase_price, product.selling_price,
            product.description || null, updatedAt, id
        ], function(err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Product not found'));
            resolve({ id, ...product });
        });
    });
}

// Delete product
function deleteProductS(id) {
    const sql = `DELETE FROM products WHERE id=?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function(err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Product not found'));
            resolve({ message: 'Product deleted successfully' });
        });
    });
}

module.exports = {
    insertProductS,
    fetchProductsS,
    updateProductS,
    deleteProductS
};