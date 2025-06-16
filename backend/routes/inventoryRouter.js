const express = require("express");
const {
  addSupplier,
  getSuppliers,
} = require("../controllers/Inventory Controllers/SupplierController");

const router = express.Router();

// Supplier Routes
router.post("/suppliers", addSupplier);
router.get("/suppliers", getSuppliers);

module.exports = router;
