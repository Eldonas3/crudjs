'use strict'

const express = require('express');
var Proveedor = require('../controllers/proveedor');

var router = express.Router();

// Ruta para guardar un proveedor
router.post('/crearProveedor',Proveedor.save);

// Ruta para obtener un proveedor
router.get('/mostrarProveedor',Proveedor.getProveedor);

//Ruta para eliminar un proveedor
router.delete('/eliminarProveedor/:id',Proveedor.delete);

// Ruta para actualizar un proveedor
router.put('/actualizarProveedor/:id',Proveedor.update);

module.exports = router;