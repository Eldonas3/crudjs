'use strict'

var Proveedor = require('../models/proveedor');

//Objeto controller que dispone de todas
//las funciones para el objeto proveedor

var controller = {
    // Método para guardar un proveedor o crearlo
    save: (req, res) => {
        // Obtenemos los datos
        var params = req.body;
    
        // Objeto a guardar
        var proveedor = new Proveedor({
            nombre: params.nombre,
            razonSocial: params.razonSocial,
            direccion:params.direccion,
            correo:params.correo,
            telefono:params.telefono
        });
    
        // Guardamos el proveedor en la BD
        proveedor.save()
            .then(proveedorStored => {
                // Devolvemos una respuesta si todo va bien
                return res.status(200).send({
                    status: 'success',
                    proveedorStored
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el proveedor',
                    error: err
                });
            });
    },
    // Método para obtener una lista de proveedores
    getProveedor: (req, res) => {
        Proveedor.find().limit(10) // Limitamos la cantidad de resultados a 10
            .then(proveedores => {
                // Devolvemos una respuesta con los proveedores encontrados
                return res.status(200).send({
                    status: 'success',
                    proveedores
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener los proveedores',
                    error: err
                });
            });
    },
    // Eliminar proveedores
    delete: (req, res) => {
        var proveedorId = req.params.id;
        Proveedor.findOneAndDelete({ _id: proveedorId })
            .then(proveedorRemoved => {
                if (!proveedorRemoved) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se ha encontrado el proveedor que se desea eliminar'
                    });
                }
                // Si no hay error, obtenemos la categoría eliminada
                return res.status(200).send({
                    status: 'Ok',
                    proveedorRemoved
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar el proveedor',
                    error: err
                });
            });
    },
    // Actualizar proveedor
    update: (req, res) => {
        var proveedorId = req.params.id;
        var params = req.body;
        const nombre = params.nombre;
        const razonSocial = params.descripcion;
        const direccion = params.direccion;
        const correo = params.correo;
        const telefono = params.telefono;
    
        Proveedor.findOneAndUpdate({ _id: proveedorId }, { 
            nombre: nombre, 
            razonSocial: razonSocial ,
            direccion:direccion,
            correo:correo,
            telefono:telefono
            }, { new: true })
            .then(proveedorUpdated => {
                if (!proveedorUpdated) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'El proveedor no existe'
                    });
                }
                // Si todo va bien
                return res.status(200).send({
                    status: 'Ok',
                    proveedorUpdated
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al actualizar el proveedor',
                    error: err
                });
            });
    }
    // fin controller
}

module.exports = controller;