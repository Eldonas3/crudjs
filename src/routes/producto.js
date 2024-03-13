'use strict'

const express = require('express');
var Producto = require('../controllers/producto');

var router = express.Router();

// Ruta para guardar un Producto
router.post('/crearProducto',Producto.save);

// Ruta para obtener un Producto
router.get('/mostrarProducto',Producto.getProducto);

//Ruta para eliminar un proveProductoedor
router.delete('/eliminarProducto/:id',Producto.delete);

// Ruta para actualizar un Producto
router.put('/actualizarProducto/:id',Producto.update);

module.exports = router;