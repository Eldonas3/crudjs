'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var proveedorSchema = new Schema({
    nombre:String,
    razonSocial:String,
    direccion:String,
    correo:String,
    telefono:String
});

module.exports = mongoose.model('proveedore',proveedorSchema);