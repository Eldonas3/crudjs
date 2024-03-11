'use strict'

var Cliente = require('../models/cliente');

//Objeto controller que dispone de todas
//las funciones para el objeto cliente

var controller = {
    // Método para guardar una cliente o crearlo
    save: (req, res) => {
        // Obtenemos los datos
        var params = req.body;
    
        // Objeto a guardar
        var cliente = new Cliente({
            nombre: params.nombre,
            apellidoPaterno: params.apellidoPaterno,
            apellidoMaterno: params.apellidoMaterno,
            rfc:params.rfc,
            correo:params.correo,
            telefono:params.telefono,
            sexo:params.sexo,
            fechaNacimiento:params.fechaNacimiento
        });
    
        // Guardamos la categoría en la BD
        cliente.save()
            .then(clienteStored => {
                // Devolvemos una respuesta si todo va bien
                return res.status(200).send({
                    status: 'success',
                    clienteStored
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el cliente',
                    error: err
                });
            });
    },
    // Método para obtener una lista de clientes
    getCliente:(req, res) => {
        Cliente.find().limit(10) // Limitamos la cantidad de resultados a 10
            .then(clientes => {
                // Devolvemos una respuesta con las categorías encontradas
                return res.status(200).send({
                    status: 'success',
                    clientes
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener clientes',
                    error: err
                });
            });
    },
    // Eliminar clientes
    delete: (req, res) => {
        var clienteId = req.params.id;
        Cliente.findOneAndDelete({ _id: clienteId })
            .then(clienteRemoved => {
                if (!clienteRemoved) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se ha encontrado el cliente que se desea eliminar'
                    });
                }
                // Si no hay error, obtenemos la categoría eliminada
                return res.status(200).send({
                    status: 'Ok',
                    clienteRemoved
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar el cliente',
                    error: err
                });
            });
    },
   // Actualizar cliente
   update: (req, res) => {
    var clienteId = req.params.id;
    var params = req.body;
    const nombre = params.nombre;
    const apellidoPaterno = params.apellidoPaterno; 
    const apellidoMaterno = params.apellidoMaterno;
    const rfc = params.rfc;
    const correo = params.correo;
    const telefono = params.telefono;
    const sexo = params.sexo;
    const fechaNacimiento = params.fechaNacimiento;
    Cliente.findOneAndUpdate({ _id: clienteId }, { 
        nombre: nombre, 
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno:apellidoMaterno,
        rfc:rfc,
        correo:correo,
        telefono:telefono,
        sexo:sexo,
        fechaNacimiento:fechaNacimiento
        }, { new: true })
        .then(clienteUpdated => {
            if (!clienteUpdated) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'El cliente no existe'
                });
            }
            // Si todo va bien
            return res.status(200).send({
                status: 'Ok',
                clienteUpdated
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'Error',
                message: 'Error al actualizar el cliente',
                error: err
            });
        });
}
}

module.exports = controller;