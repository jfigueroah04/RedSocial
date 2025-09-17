// Importar dependencias
const express = require('express');
const cors = require('cors');
// OJO: desestructurar
const { connection } = require('./database/connection');

// Mensaje de bienvenida
console.log('Bienvenido a mi red social');

// Conectar a la base de datos
connection();
console.log('Conexión a la base de datos exitosa');

// Crear el servidor de Node
const app = express();
const puerto = 3900;

// Configurar CORS y body-parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Importar rutas de usuario
const userRoutes = require('./database/routes/user');
app.use('/api/user', userRoutes);

// Levantar servidor
app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
