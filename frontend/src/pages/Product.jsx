// src/pages/Product.jsx
import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

function Product() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchParams();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchParams = async () => {
    const [brandsRes, suppliersRes, categoriesRes, subcategoriesRes, unitsRes, colorsRes] = await Promise.all([
      fetch("http://localhost:3001/brands"),
      fetch("http://localhost:3001/suppliers"),
      fetch("http://localhost:3001/category"),
      fetch("http://localhost:3001/sub-category"),
      fetch("http://localhost:3001/units"),
      fetch("http://localhost:3001/colors"),
    ]);

    setBrands(await brandsRes.json());
    setSuppliers(await suppliersRes.json());
    setCategories(await categoriesRes.json());
    setSubcategories(await subcategoriesRes.json());
    setUnits(await unitsRes.json());
    setColors(await colorsRes.json());
  };

  const handleOpen = (product = null) => {
    if (product) {
      setEditId(product.id);
      setFormData(product);
    } else {
      setEditId(null);
      setFormData({});
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const method = editId ? "PUT" : "POST";
    const url = editId ? `http://localhost:3001/products/${editId}` : "http://localhost:3001/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchProducts();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add Product</Button>

      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Selling Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{brands.find(b => b.id === p.brand_id)?.name || ""}</TableCell>
                <TableCell>{suppliers.find(s => s.id === p.supplier_id)?.name || ""}</TableCell>
                <TableCell>{categories.find(c => c.id === p.category_id)?.name || ""}</TableCell>
                <TableCell>{subcategories.find(sc => sc.id === p.subcategory_id)?.name || ""}</TableCell>
                <TableCell>{units.find(u => u.id === p.unit_id)?.name || ""}</TableCell>
                <TableCell>{colors.find(c => c.id === p.color_id)?.name || ""}</TableCell>
                <TableCell>{p.purchase_price}</TableCell>
                <TableCell>{p.selling_price}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(p)}><Edit /></Button>
                  <Button onClick={() => handleDelete(p.id)} color="error"><Delete /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Add/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "400px" }}>
          <TextField name="name" label="Name" value={formData.name || ""} onChange={handleChange} />
          <TextField select name="brand_id" label="Brand" value={formData.brand_id || ""} onChange={handleChange}>
            {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
          </TextField>
          <TextField select name="supplier_id" label="Supplier" value={formData.supplier_id || ""} onChange={handleChange}>
            {suppliers.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </TextField>
          <TextField select name="category_id" label="Category" value={formData.category_id || ""} onChange={handleChange}>
            {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </TextField>
          <TextField select name="subcategory_id" label="Subcategory" value={formData.subcategory_id || ""} onChange={handleChange}>
            {subcategories.map(sc => <MenuItem key={sc.id} value={sc.id}>{sc.name}</MenuItem>)}
          </TextField>
          <TextField select name="unit_id" label="Unit" value={formData.unit_id || ""} onChange={handleChange}>
            {units.map(u => <MenuItem key={u.id} value={u.id}>{u.name}</MenuItem>)}
          </TextField>
          <TextField select name="color_id" label="Color" value={formData.color_id || ""} onChange={handleChange}>
            <MenuItem value="">None</MenuItem>
            {colors.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
          </TextField>
          <TextField name="purchase_price" label="Purchase Price" type="number" value={formData.purchase_price || ""} onChange={handleChange} />
          <TextField name="selling_price" label="Selling Price" type="number" value={formData.selling_price || ""} onChange={handleChange} />
          <TextField name="description" label="Description" value={formData.description || ""} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Product;
