const express = require("express");
const {
  addSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/Inventory Controllers/SupplierController");
const { addBrand, getBrand, updateBrands, deleteBrand } = require("../controllers/Inventory Controllers/BrandsController");
const { addCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/Inventory Controllers/CategoriesController");

const router = express.Router();

// Supplier Routes
router.post("/suppliers", addSupplier);
router.get("/suppliers", getSuppliers);
router.put("/suppliers/:id", updateSupplier);
router.delete("/suppliers/:id", deleteSupplier)


//brands routers
router.post("/brands", addBrand);
router.get("/brands", getBrand);
router.put("/brands/:id", updateBrands);
router.delete("/brands/:id", deleteBrand)


//categories routers
router.post("/category", addCategories);
router.get("/category", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory)

module.exports = router;
