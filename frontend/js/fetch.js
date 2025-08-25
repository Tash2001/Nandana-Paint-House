// fetch.js
const API_BASE = "http://localhost:3001";

// Suppliers GET
async function getSuppliers() {
  const res = await fetch(`${API_BASE}/suppliers`);
  return res.json();
}

// Brands GET
async function getBrands() {
  const res = await fetch(`${API_BASE}/brands`);
  return res.json();
}

// Units GET
async function getUnits() {
  const res = await fetch(`${API_BASE}/units`);
  return res.json();
}

// Categories GET
async function getCategories() {
  const res = await fetch(`${API_BASE}/category`);
  return res.json();
}

// Subcategories GET
async function getSubcategories() {
  const res = await fetch(`${API_BASE}/sub-category`);
  return res.json();
}

// Colors GET
async function getColors() {
  const res = await fetch(`${API_BASE}/colors`);
  return res.json();
}

// Products GET
async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

//Stock GET
async function getStock() {
  const res = await fetch(`${API_BASE}/stock`);
  return res.json();
}

//Transaction GET
async function getTransaction() {
  const res = await fetch(`${API_BASE}/transactions`);
  return res.json();
}

