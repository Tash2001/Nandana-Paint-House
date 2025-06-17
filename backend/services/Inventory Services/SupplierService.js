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

//update supplier
function updateSupplierService(id, name) {
    const updateAt = new Date().toISOString();
    const sql = `
        UPDATE suppliers
        SET name = ?, updated_at =? WHERE id = ?
    `;

    return new Promise ((resolve, reject) => {
        db.run(sql, [name, updateAt, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject (new Error ('Supplier not found'));
            resolve ({id,name});
        });
    });
    
}


function deleteSupplierS(id) {
    const sql = `DELETE FROM suppliers WHERE id = ?`;

    return new Promise ((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            if (this.changes === 0) return reject(new Error('Supplier not found'));
            resolve({message: 'Supplier Deleted Succesfully'});
        });
    });
}

module.exports = {
    insertSupplier, fetchSuppliers, updateSupplierService, deleteSupplierS
};

