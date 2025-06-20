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
