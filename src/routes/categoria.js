'use strict'

const express = require('express');
var Categoria = require('../controllers/categoria');

var router = express.Router();

// Ruta para guardar una categoria
router.post('/crear',Categoria.save);

// Ruta para obtener una categoria
router.get('/mostrar',Categoria.getCategoria);

//Ruta para eliminar una categoria
router.delete('/eliminar/:id',Categoria.delete);

// Ruta para actualizar una nota
router.put('/actualizar/:id',Categoria.update);

module.exports = router;