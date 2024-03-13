'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var membresiaSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    usuario: {
        nombre: String,
        apellidoPaterno: String,
        apellidoMaterno: String,
        rfc: String,
        correo: String,
        telefono: String,
        sexo: String,
        fechaNacimiento: Date
    }
});

module.exports = mongoose.model('membresia',membresiaSchema);