const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Nandana Paint Shop Backend Running');
});

const PORT = 3001;
app.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));