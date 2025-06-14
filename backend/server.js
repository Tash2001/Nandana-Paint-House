const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const billRoutes = require('./routes/billRoutes');
const inventoryRoutes = require('./routes/inventory');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Nandana Paint Shop Backend Running');
});

app.use('/api/bill', billRoutes);
app.use('/api/inventory', inventoryRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));