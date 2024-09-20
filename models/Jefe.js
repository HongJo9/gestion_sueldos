// models/Jefe.js
const mongoose = require('mongoose');

const NotificacionSchema = new mongoose.Schema({
  mensaje: String,
  fecha: { type: Date, default: Date.now },
  visto: { type: Boolean, default: false },
});

const JefeSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  modulo_notificaciones: [NotificacionSchema],
});

module.exports = mongoose.model('Jefe', JefeSchema);
