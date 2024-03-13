'use strict'

var Membresia = require('../models/membresia');

//Objeto controller que dispone de todas
//las funciones para el objeto proveedor

var controller = {
    // Método para guardar una membresia o crearla
    save: (req,res)=>{
        // Obtenemos los datos
        var params = req.body;

        // Objeto a guardar
        var membresia = new Membresia({
            nombre: params.nombre,
            descripcion: params.descripcion,
            imagen: params.imagen,
            usuario: {
                nombre: params.usuario.nombre,
                apellidoPaterno: params.usuario.apellidoPaterno,
                apellidoMaterno: params.usuario.apellidoMaterno,
                rfc: params.usuario.rfc,
                correo: params.usuario.correo,
                telefono: params.usuario.telefono,
                sexo: params.usuario.sexo,
                fechaNacimiento: new Date(params.usuario.fechaNacimiento)
            }
        });
        // Guardamos el proveedor en la BD
        membresia.save()
        .then(membresiaStored => {
            // Devolvemos una respuesta si todo va bien
            return res.status(200).send({
                status: 'success',
                membresiaStored
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'error',
                message: 'Error al guardar la membresia',
                error: err
            });
        });
    },

    // Método para obtener una lista de proveedores
    getMembresia: (req, res) => {
        Membresia.find().limit(10) // Limitamos la cantidad de resultados a 10
            .then(membresias => {
                // Devolvemos una respuesta con los proveedores encontrados
                return res.status(200).send({
                    status: 'success',
                    membresias
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener las membresias',
                    error: err
                });
            });
    },
    // Eliminar categorias
    delete: (req, res) => {
        var membresiaId = req.params.id;
        Membresia.findOneAndDelete({ _id: membresiaId })
            .then(membresiaRemoved => {
                if (!membresiaRemoved) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se ha encontrado la membresia que se desea eliminar'
                    });
                }
                // Si no hay error, obtenemos la categoría eliminada
                return res.status(200).send({
                    status: 'Ok',
                    membresiaRemoved
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
    // Actualizar membresia
    update:(req,res) => {
        var membresiaId = req.params.id;
        var params = req.body;
        const nombre = params.nombre;
        const descripcion = params.descripcion;
        const imagen = params.imagen;
        const usuario  = params.usuario;

     // Realizar la actualización en la base de datos
     Membresia.findOneAndUpdate(
        { _id: membresiaId },
        {
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen,
            usuario: {
                nombre: usuario.nombre,
                apellidoPaterno: usuario.apellidoPaterno,
                apellidoMaterno: usuario.apellidoMaterno,
                rfc: usuario.rfc,
                correo: usuario.correo,
                telefono: usuario.telefono,
                sexo: usuario.sexo,
                fechaNacimiento: new Date(usuario.fechaNacimiento)
            }
        },
        { new: true } // Para devolver el documento actualizado
    )
    .then(membresiaRemoved => {
        if (!membresiaRemoved) {
            return res.status(404).send({
                status: 'Error',
                message: 'La membresia no existe'
            });
        }
        // Si todo va bien
        return res.status(200).send({
            status: 'Ok',
            membresiaRemoved
        });
    })
    .catch(err => {
        // Manejar el error
        return res.status(500).send({
            status: 'Error',
            message: 'Error al actualizar la membresia',
            error: err
        });
    });
    }

}

module.exports = controller;