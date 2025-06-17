const db = require('../../db.js')

//creating new brand
 function insertBrandsS(name) {
    const createdAt = new Date().toISOString();

    const sql = `
        INSERT INTO brands (name,created_at, updated_at)
        VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.run(sql, [name, createdAt, createdAt], function (err) {
            if (err) return reject(err);
            resolve({id: this.lastID, name});
        });
    });
}


//Get all brands
function fetchBrandsS() {
    const sql = `SELECT * FROM brands`;
    return new Promise((resolve,reject) => {
        db.all(sql, [],(err,rows) => {
            if(err) return reject(err);
            resolve(rows)
        });
    });
}

//update brands
function updateBrandS(id, name) {
    const updateAt = new Date().toISOString();
    const sql = `
        UPDATE brands
        SET name = ?, updated_at =? WHERE id = ?
    `;

    return new Promise ((resolve, reject) => {
        db.run(sql, [name, updateAt, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject (new Error ('Brand not found'));
            resolve ({id,name});
        });
    });
    
}


function deleteBranS(id) {
    const sql = `DELETE FROM brands WHERE id = ?`;

    return new Promise ((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            if (this.changes === 0) return reject(new Error('Brand not found'));
            resolve({message: 'Brand Deleted Succesfully'});
        });
    });
}

module.exports = {
    insertBrandsS, fetchBrandsS, updateBrandS, deleteBranS
};

