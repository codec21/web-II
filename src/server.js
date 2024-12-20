require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const swagger = require('./config/swagger');

const app = express();
app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup);
app.use('/usuarios', userRoutes);
app.use('/eventos', eventoRoutes);
app.use('/comentarios', comentarioRoutes); 

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
