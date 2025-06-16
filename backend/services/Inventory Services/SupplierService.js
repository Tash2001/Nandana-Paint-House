const db = require('../../db.js')

//creating new supplier
 function insertSupplier(name) {
    const createdAt = new Date().toISOString();

    const sql = `
        INSERT INTO suppliers (name,created_at, updated_at)
        VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.run(sql, [name, createdAt, createdAt], function (err) {
            if (err) return reject(err);
            resolve({id: this.lastID, name});
        });
    });
}


//Get all Suppliers
function fetchSuppliers() {
    const sql = `SELECT * FROM suppliers`;
    return new Promise((resolve,reject) => {
        db.all(sql, [],(err,rows) => {
            if(err) return reject(err);
            resolve(rows)
        });
    });
}

module.exports = {
    insertSupplier, fetchSuppliers
};

