const { addTransaction, fetchTransactions, fetchTransactionsByProduct } = require("../../services/Inventory Services/TransactionService");

// Buy transaction
async function buyProduct(req, res) {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Product ID and Quantity are required" });
    }
    try {
        const result = await addTransaction(product_id, "BUY", quantity);
        res.status(201).json({ message: "Stock purchased", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Sell transaction
async function sellProduct(req, res) {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Product ID and Quantity are required" });
    }
    try {
        const result = await addTransaction(product_id, "SELL", quantity);
        res.status(201).json({ message: "Stock sold", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all transactions
async function getTransactions(req, res) {
    try {
        const transactions = await fetchTransactions();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get transactions by product
async function getTransactionsByProduct(req, res) {
    const { productId } = req.params;
    try {
        const transactions = await fetchTransactionsByProduct(productId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    buyProduct,
    sellProduct,
    getTransactions,
    getTransactionsByProduct
};
