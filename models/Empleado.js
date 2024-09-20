// models/Empleado.js
const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  pais: String,
  departamento: String,
  tiempo_trabajando: String,
  sueldo_pagado: { type: Boolean, default: false },
  historial_pagos: [
    {
      fecha: Date,
      monto: Number,
    },
  ],
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);
