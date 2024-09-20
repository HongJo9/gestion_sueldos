// routes/empleados.js
const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

// Mostrar todos los empleados
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.render('empleados/index', { empleados });
  } catch (err) {
    res.status(500).send('Error al obtener empleados');
  }
});

// Formulario para crear un nuevo empleado
router.get('/nuevo', (req, res) => {
  res.render('empleados/nuevo');
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
  const empleado = new Empleado(req.body);
  try {
    await empleado.save();
    res.redirect('/empleados');
  } catch (err) {
    res.status(500).send('Error al crear empleado');
  }
});

// Otras rutas como editar, eliminar, etc., pueden agregarse aquí

module.exports = router;
