// models/Pago.js
const mongoose = require('mongoose');

const PagoSchema = new mongoose.Schema({
  empleado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' },
  fecha_pago: { type: Date, default: Date.now },
  monto: Number,
  estado: { type: String, default: 'pagado' },
});

module.exports = mongoose.model('Pago', PagoSchema);
