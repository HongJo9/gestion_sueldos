// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const Jefe = require('./models/Jefe');
const Empleado = require('./models/Empleado');

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', (error) => console.error('Error al conectar a MongoDB:', error));
db.once('open', () => console.log('Conectado a MongoDB'));

// Configurar EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const indexRouter = require('./routes/index');
const empleadosRouter = require('./routes/empleados');
const pagosRouter = require('./routes/pagos');
const jefesRouter = require('./routes/jefes');

app.use('/', indexRouter);
app.use('/empleados', empleadosRouter);
app.use('/pagos', pagosRouter);
app.use('/jefes', jefesRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Programar tarea cada día a las 9 AM
cron.schedule('0 9 * * *', async () => {
    try {
      const empleadosSinPagar = await Empleado.find({ sueldo_pagado: false });
      if (empleadosSinPagar.length > 0) {
        const mensajes = empleadosSinPagar.map((emp) => ({
          mensaje: `Falta pagar a ${emp.nombre} ${emp.apellido}`,
        }));
  
        // Agregar notificaciones al jefe
        await Jefe.findOneAndUpdate(
          {},
          { $push: { modulo_notificaciones: { $each: mensajes } } }
        );
  
        console.log('Notificaciones actualizadas');
      }
    } catch (err) {
      console.error('Error al generar notificaciones:', err);
    }
  });