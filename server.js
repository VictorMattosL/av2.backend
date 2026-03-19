const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API da Clínica rodando! ✅' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado!');
    app.listen(process.env.PORT || 3000, () =>
      console.log(`🚀 Servidor na porta ${process.env.PORT || 3000}`)
    );
  })
  .catch(err => console.error('Erro MongoDB:', err));