const { insertProductS, fetchProductsS, updateProductS, deleteProductS } = require("../../services/Inventory Services/ProductService");

// Create product
async function addProduct(req, res) {
    const product = req.body;
    if (!product.name || !product.brand_id || !product.supplier_id || !product.category_id ||
        !product.subcategory_id || !product.unit_id || !product.purchase_price || !product.selling_price) {
        return res.status(400).json({ error: "Required fields are missing" });
    }
    try {
        const result = await insertProductS(product);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all products
async function getProducts(req, res) {
    try {
        const products = await fetchProductsS();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update product
async function updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    try {
        const result = await updateProductS(id, product);
        res.status(200).json({ message: "Product updated", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete product
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await deleteProductS(id);
        res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};
