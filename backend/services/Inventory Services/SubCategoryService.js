const db = require('../../db.js')

//creating new supplier
 function insertSCategoryS(name) {
    const createdAt = new Date().toISOString();

    const sql = `
        INSERT INTO subCategories (name,created_at, updated_at)
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
function fetchSCategoriesS() {
    const sql = `SELECT * FROM subCategories`;
    return new Promise((resolve,reject) => {
        db.all(sql, [],(err,rows) => {
            if(err) return reject(err);
            resolve(rows)
        });
    });
}

//update supplier
function updateSCategoryS(id, name) {
    const updateAt = new Date().toISOString();
    const sql = `
        UPDATE subCategories
        SET name = ?, updated_at =? WHERE id = ?
    `;

    return new Promise ((resolve, reject) => {
        db.run(sql, [name, updateAt, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject (new Error ('SubCategory not found'));
            resolve ({id,name});
        });
    });
    
}


function deleteSCategoryS(id) {
    const sql = `DELETE FROM subCategories WHERE id = ?`;

    return new Promise ((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            if (this.changes === 0) return reject(new Error('Sub Category not found'));
            resolve({message: 'Sub Category Deleted Succesfully'});
        });
    });
}

module.exports = {
    insertSCategoryS, fetchSCategoriesS, updateSCategoryS, deleteSCategoryS
};

