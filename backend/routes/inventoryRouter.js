const express = require("express");
const {addSupplier,getSuppliers,updateSupplier,deleteSupplier,} = require("../controllers/Inventory Controllers/SupplierController");
const { addBrand, getBrand, updateBrands, deleteBrand } = require("../controllers/Inventory Controllers/BrandsController");
const { addCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/Inventory Controllers/CategoriesController");
const { addSCategories, getSCategory, updateSCategory, deleteSCategory } = require("../controllers/Inventory Controllers/SubCategoryController");
const { createColor, getColors, updateColor, deleteColor } = require("../controllers/Inventory Controllers/ColorController");
const { addUnit, getUnits, updateUnit, deleteUnit } = require("../controllers/Inventory Controllers/UnitsController");
const { addProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/Inventory Controllers/ProductsController");


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


//sub-categories routers
router.post("/sub-category", addSCategories);
router.get("/sub-category", getSCategory);
router.put("/sub-category/:id", updateSCategory);
router.delete("/sub-category/:id", deleteSCategory)


//color-routers
router.post("/colors", createColor);
router.get("/colors", getColors);
router.put("/colors/:id", updateColor);
router.delete("/colors/:id", deleteColor)


// units routes
router.post("/units", addUnit);
router.get("/units", getUnits);
router.put("/units/:id", updateUnit);
router.delete("/units/:id", deleteUnit);



// Products routes
router.post("/products", addProduct);
router.get("/products", getProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);


module.exports = router;
