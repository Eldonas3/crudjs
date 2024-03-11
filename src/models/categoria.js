'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('categoria',categoriaSchema);