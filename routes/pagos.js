// routes/pagos.js
const express = require('express');
const router = express.Router();
const Pago = require('../models/Pago');
const Empleado = require('../models/Empleado');

// Mostrar pagos pendientes
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find({ sueldo_pagado: false });
    res.render('pagos/index', { empleados });
  } catch (err) {
    res.status(500).send('Error al obtener pagos');
  }
});

// Realizar un pago a un empleado
router.post('/pagar/:id', async (req, res) => {
  try {
    const empleadoId = req.params.id;
    const monto = req.body.monto;

    const pago = new Pago({
      empleado: empleadoId,
      monto: monto,
    });

    await pago.save();

    // Actualizar estado del empleado
    await Empleado.findByIdAndUpdate(empleadoId, {
      sueldo_pagado: true,
      $push: {
        historial_pagos: { fecha: new Date(), monto: monto },
      },
    });

    res.redirect('/pagos');
  } catch (err) {
    res.status(500).send('Error al realizar el pago');
  }
});

module.exports = router;
