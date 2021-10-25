require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor Express
const app = express();

// Configurar Cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Directorio Publico
app.use(express.static('public'));

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/busquedas', require('./routes/busquedas'));
app.use('/api/candidatos', require('./routes/candidatos'));
app.use('/api/todo', require('./routes/buscadores'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/perfiles', require('./routes/perfiles'));
app.use('/api/herramientas', require('./routes/herramientas'));
app.use('/api/tipoentrevista', require('./routes/tipoentrevista'));
app.use('/api/herramientasos', require('./routes/herramientasos'));
app.use('/api/herramientasdb', require('./routes/herramientasdb'));
app.use('/api/herramientasba', require('./routes/herramientasba'));
app.use('/api/lenguajes', require('./routes/lenguajes'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/login', require('./routes/auth'));

// lo ultimo
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/candidatos/index.html'));
});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});