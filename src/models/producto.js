'use strict'
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productoSchema = new mongoose.Schema({
    nombre:String,
    precio:String,
    caducidad:Date,
    stock:Number,
    proveedor:{
        nombre:String,
        razonSocial:String,
        direccion:String,
        correo:String,
        telefono:String
    },
    categoria:{
        nombre: String,
        descripcion: String
    }
});

module.exports = mongoose.model('producto',productoSchema);