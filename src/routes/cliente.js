'use strict'

const express = require('express');
var Cliente = require('../controllers/cliente');

var router = express.Router();

// Ruta para guardar un cliente
router.post('/crearCliente',Cliente.save);

// Ruta para obtener un cliente
router.get('/mostrarCliente',Cliente.getCliente);

//Ruta para eliminar un cliente
router.delete('/eliminarCliente/:id',Cliente.delete);

// Ruta para actualizar un cliente
router.put('/actualizarCliente/:id',Cliente.update);

module.exports = router;