const { insertSupplier, fetchSuppliers } = require("../../services/Inventory Services/SupplierService");



//Add supplier
async function addSupplier(req,res) {
    const {name} = req.body;
    console.log("Supplier name :" , name);

    if(!name) {
        return res.status(400).json({error: "Supplier is Required"});
    }

    try {
        const result = await insertSupplier(name);
        res.status(201).json(result);
        console.log("Supplier Created")
    } catch (error) {
        res.status(500).json({error: error.message});
        console.error("Supplier Creation Failed ",error.message)
    }
}

async function getSuppliers(req,res) {
    try {
        const suppliers = await fetchSuppliers();
        res.status(200).json(suppliers);
        console.log("Suppliers Fetched");

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {addSupplier, getSuppliers};