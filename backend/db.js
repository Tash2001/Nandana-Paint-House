const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { deflate } = require("zlib");

const dbPath = path.join(__dirname, "data", "paintshop.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error("DB Connect Error:", err.message);
  console.log("Connected to SQLite database.");
});

db.serialize(() => {
  //INVENTORY  PART

  //Supplier Table
  db.run(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL ,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP

    );`);

  //brands tables
  db.run(`
    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL ,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP

    );`);

  //categories tables
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL ,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP

    );`);

  //subcategory tables
  db.run(`
    CREATE TABLE IF NOT EXISTS subCategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL ,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP

    );`);

  //color table
  db.run(`
    CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    brand_id INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (brand_id) REFERENCES brands(id)
);
`);


  //unit table
  db.run(`
    CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
    `);

    // Products Table
db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        brand_id INTEGER NOT NULL,
        supplier_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        subcategory_id INTEGER NOT NULL,
        unit_id INTEGER NOT NULL,
        color_id INTEGER,
        purchase_price REAL NOT NULL,
        selling_price REAL NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (brand_id) REFERENCES brands(id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id),
        FOREIGN KEY (unit_id) REFERENCES units(id),
        FOREIGN KEY (color_id) REFERENCES colors(id)
    );
`);


//stock table
db.run(`
    CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER UNIQUE NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
`);


//tranaction table
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('BUY', 'SELL')),
    quantity INTEGER NOT NULL,
    transaction_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

  `);


  db.run(`
  CREATE TABLE IF NOT EXISTS bills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT (datetime('now', 'localtime')),
    total_net_amount REAL NOT NULL,
    discount REAL DEFAULT 0,
    total_payable_value REAL NOT NULL
  );
`);

  // Create bill_items table
  db.run(`
  CREATE TABLE IF NOT EXISTS bill_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bill_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    item_discount REAL DEFAULT 0,
    total REAL NOT NULL,
    FOREIGN KEY (bill_id) REFERENCES bills(id)
    -- FOREIGN KEY (product_id) REFERENCES products(id)
  );
`);

  //credit customers
  db.run(`
  CREATE TABLE IF NOT EXISTS credit_customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    bill_id INTEGER NOT NULL,
    total_credit REAL NOT NULL,
    amount_paid REAL DEFAULT 0,
    remaining_balance AS (total_credit - amount_paid) STORED,
    status TEXT DEFAULT 'unpaid',
    last_paid_date TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (bill_id) REFERENCES bills(id)
  );
`);

  //credit custormers payment traking
  db.run(`
  CREATE TABLE IF NOT EXISTS credit_payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    credit_customer_id INTEGER NOT NULL,
    amount_paid REAL NOT NULL,
    paid_at TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (credit_customer_id) REFERENCES credit_customers(id)
  );
`);

  // Purchases Table
  db.run(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      date TEXT NOT NULL,
      total_amount REAL NOT NULL,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
    );
  `);

  // Purchase Items Table
  db.run(`
    CREATE TABLE IF NOT EXISTS purchase_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      purchase_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      total REAL NOT NULL,
      FOREIGN KEY (purchase_id) REFERENCES purchases(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
});

module.exports = db;
