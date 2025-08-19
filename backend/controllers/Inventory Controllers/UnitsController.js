const { insertUnitS, fetchUnitsS, updateUnitS, deleteUnitS } = require("../../services/Inventory Services/UnitsService");

// Create unit
async function addUnit(req, res) {
    const { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Unit name is required" });
    }
    try {
        const result = await insertUnitS(name.trim());
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all units
async function getUnits(req, res) {
    console.log("GET /units called");
    try {
        const units = await fetchUnitsS();
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update unit
async function updateUnit(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Unit name is required" });
    }
    try {
        const result = await updateUnitS(id, name.trim());
        res.status(200).json({ message: "Unit updated", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete unit
async function deleteUnit(req, res) {
    const { id } = req.params;
    try {
        await deleteUnitS(id);
        res.status(200).json({ message: "Unit deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addUnit,
    getUnits,
    updateUnit,
    deleteUnit
};
