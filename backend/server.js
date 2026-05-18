require('dotenv').config();

const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productos.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API mini_stock funcionando');
});

app.use('/api/productos', productosRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Backend corriendo en puerto ${process.env.PORT}`);
});
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});