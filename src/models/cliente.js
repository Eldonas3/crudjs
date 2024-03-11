'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var clienteSchema = new Schema({
    nombre:String,
    apellidoPaterno:String,
    apellidoMaterno:String,
    rfc:String,
    correo:String,
    telefono:String,
    sexo:String,
    fechaNacimiento:{type:Date, default: Date.now}
});

module.exports = mongoose.model('cliente',clienteSchema);