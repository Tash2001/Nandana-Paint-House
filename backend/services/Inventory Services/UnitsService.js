const db = require('../../db.js');

//create
function insertUnitS(name) {
    const createdAt = new Date().toISOString();
    const sql = `
        INSERT INTO units (name, created_at, updated_at)
        VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.run(sql, [name, createdAt, createdAt], function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID, name });
        });
    });
}


//get
function fetchUnitsS() {
    const sql = `SELECT * FROM units`;
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

// Update unit
function updateUnitS(id, name) {
    const updatedAt = new Date().toISOString();
    const sql = `
        UPDATE units
        SET name = ?, updated_at = ?
        WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
        db.run(sql, [name, updatedAt, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Unit not found'));
            resolve({ id, name });
        });
    });
}

// Delete unit
function deleteUnitS(id) {
    const sql = `DELETE FROM units WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject(new Error('Unit not found'));
            resolve({ message: 'Unit deleted successfully' });
        });
    });
}

module.exports = {
    insertUnitS,
    fetchUnitsS,
    updateUnitS,
    deleteUnitS
};