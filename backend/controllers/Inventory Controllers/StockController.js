const { insertStockS, fetchStockS, fetchStockByProductS, updateStockS, deleteStockS } = 
    require("../../services/Inventory Services/StockService");

// Add or initialize stock
async function addStock(req, res) {
    const stock = req.body;
    if (!stock.product_id || stock.quantity === undefined) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }
    try {
        const result = await insertStockS(stock);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all stock
async function getStock(req, res) {
    try {
        const stock = await fetchStockS();
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get stock for one product
async function getStockByProduct(req, res) {
    const { productId } = req.params;
    try {
        const stock = await fetchStockByProductS(productId);
        if (!stock) return res.status(404).json({ error: "Stock not found" });
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update stock
async function updateStock(req, res) {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (quantity === undefined) {
        return res.status(400).json({ error: "Quantity is required" });
    }
    try {
        const result = await updateStockS(productId, quantity);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete stock
async function deleteStock(req, res) {
    const { productId } = req.params;
    try {
        const result = await deleteStockS(productId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addStock,
    getStock,
    getStockByProduct,
    updateStock,
    deleteStock
};
