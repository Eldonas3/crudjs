'use strict'

const express = require('express');
var Membresia = require('../controllers/membresia');

var router = express.Router();

// Ruta para guardar una Membresia
router.post('/crearMembresia',Membresia.save);

// Ruta para obtener una Membresia
router.get('/mostrarMembresia',Membresia.getMembresia);

//Ruta para eliminar una Membresia
router.delete('/eliminarMembresia/:id',Membresia.delete);

// Ruta para actualizar una Membresia
router.put('/actualizarMembresia/:id',Membresia.update);

module.exports = router;