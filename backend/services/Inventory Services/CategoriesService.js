const db = require('../../db.js')

//creating new supplier
 function insertCategoryS(name) {
    const createdAt = new Date().toISOString();

    const sql = `
        INSERT INTO categories (name,created_at, updated_at)
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
function fetchCategoriesS() {
    const sql = `SELECT * FROM categories`;
    return new Promise((resolve,reject) => {
        db.all(sql, [],(err,rows) => {
            if(err) return reject(err);
            resolve(rows)
        });
    });
}

//update supplier
function updateCategoryS(id, name) {
    const updateAt = new Date().toISOString();
    const sql = `
        UPDATE categories
        SET name = ?, updated_at =? WHERE id = ?
    `;

    return new Promise ((resolve, reject) => {
        db.run(sql, [name, updateAt, id], function (err) {
            if (err) return reject(err);
            if (this.changes === 0) return reject (new Error ('Category not found'));
            resolve ({id,name});
        });
    });
    
}


function deleteCategoryS(id) {
    const sql = `DELETE FROM categories WHERE id = ?`;

    return new Promise ((resolve, reject) => {
        db.run(sql, [id], function (err) {
            if(err) return reject(err);
            if (this.changes === 0) return reject(new Error('Category not found'));
            resolve({message: 'Category Deleted Succesfully'});
        });
    });
}

module.exports = {
    insertCategoryS, fetchCategoriesS, updateCategoryS, deleteCategoryS
};

