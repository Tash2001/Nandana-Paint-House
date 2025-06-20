const {
  insertColor,
  getAllColors,
  updateColor,
  deleteColor
} = require('../../services/Inventory Services/ColorService');

exports.createColor = async (req, res) => {
  const { name, brandId } = req.body;
  try {
    const result = await insertColor(name, brandId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getColors = async (req, res) => {
  try {
    const colors = await getAllColors();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateColor = async (req, res) => {
  const { id } = req.params;
  const { name, brandId } = req.body;
  try {
    const updated = await updateColor(id, name, brandId);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteColor = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteColor(id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
