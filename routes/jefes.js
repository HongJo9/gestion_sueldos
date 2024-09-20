// routes/jefes.js
const express = require('express');
const router = express.Router();
const Jefe = require('../models/Jefe');

// Mostrar perfil del jefe
router.get('/', async (req, res) => {
  try {
    const jefe = await Jefe.findOne(); // Asumiendo que hay un solo jefe
    res.render('jefes/perfil', { jefe });
  } catch (err) {
    res.status(500).send('Error al obtener datos del jefe');
  }
});

// Editar perfil del jefe
router.get('/editar', async (req, res) => {
  try {
    const jefe = await Jefe.findOne();
    res.render('jefes/editar', { jefe });
  } catch (err) {
    res.status(500).send('Error al obtener datos del jefe');
  }
});

router.post('/editar', async (req, res) => {
  try {
    await Jefe.findOneAndUpdate({}, req.body);
    res.redirect('/jefes');
  } catch (err) {
    res.status(500).send('Error al actualizar datos del jefe');
  }
});

// routes/jefes.js
router.post('/notificaciones/visto', async (req, res) => {
    try {
      await Jefe.updateMany(
        {},
        { $set: { 'modulo_notificaciones.$[].visto': true } }
      );
      res.redirect('/jefes');
    } catch (err) {
      res.status(500).send('Error al actualizar notificaciones');
    }
  });
  

module.exports = router;
