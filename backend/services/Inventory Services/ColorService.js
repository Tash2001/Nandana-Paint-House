const db = require("../../db.js");

//getting the brand name for the added id of the brand
function getBrandName(brandId) {
  return new Promise((resolve, reject) => {
    db.get("SELECT name FROM brands WHERE id = ?", [brandId], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject(new Error("Brand not found"));
      resolve(row.name);
    });
  });
}

//inserting the color
function insertColor(name, brandId) {
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  return getBrandName(brandId).then((brandName) => {
    const fullName = `${name} - ${brandName}`;
    const sql = `
            INSERT INTO colors (name, brand_id, full_name, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
        `;

    return new Promise((resolve, reject) => {
      db.run(
        sql,
        [name, brandId, fullName, createdAt, updatedAt],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, name, brandId, fullName });
        }
      );
    });
  });
}

function getAllColors() {
  const sql = `
    SELECT c.id, c.name AS colorName, b.name AS brandName, c.full_name AS fullName
    FROM colors c
    JOIN brands b ON c.brand_id = b.id
  `;

  return new Promise ((resolve,reject) => {
    db.all(sql, [], (err,rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}



function updateColor(id, name, brandId) {
  const updatedAt = new Date().toISOString();

  return getBrandName(brandId).then(brandName => {
    const fullName = `${name} - ${brandName}`;
    const sql = `
      UPDATE colors
      SET name = ?, brand_id = ?, full_name = ?, updated_at = ?
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.run(sql, [name, brandId, fullName, updatedAt, id], function (err) {
        if (err) return reject(err);
        if (this.changes === 0) return reject(new Error('Color not found'));
        resolve({ id, name, brandId, fullName });
      });
    });
  });
}

function deleteColor(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM colors WHERE id = ?', [id], function (err) {
      if (err) return reject(err);
      if (this.changes === 0) return reject(new Error('Color not found'));
      resolve({ message: 'Color deleted', id });
    });
  });
}

module.exports = {
  insertColor,
  getAllColors,
  updateColor,
  deleteColor,
};
