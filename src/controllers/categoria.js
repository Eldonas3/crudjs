'use strict'

var Categoria = require('../models/categoria');

//Objeto controller que dispone de todas
//las funciones para el objeto categoria

var controller = {
// Método para guardar una categoría o crearla
save: (req, res) => {
    // Obtenemos los datos
    var params = req.body;

    // Objeto a guardar
    var categoria = new Categoria({
        nombre: params.nombre,
        descripcion: params.descripcion
    });

    // Guardamos la categoría en la BD
    categoria.save()
        .then(categoriaStored => {
            // Devolvemos una respuesta si todo va bien
            return res.status(200).send({
                status: 'success',
                categoriaStored
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'error',
                message: 'Error al guardar la categoría',
                error: err
            });
        });
},

// Método para obtener una lista de categorías
getCategoria: (req, res) => {
    Categoria.find().limit(10) // Limitamos la cantidad de resultados a 10
        .then(categorias => {
            // Devolvemos una respuesta con las categorías encontradas
            return res.status(200).send({
                status: 'success',
                categorias
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'error',
                message: 'Error al obtener las categorías',
                error: err
            });
        });
},

// Eliminar categorias
delete: (req, res) => {
    var categoriaId = req.params.id;
    Categoria.findOneAndDelete({ _id: categoriaId })
        .then(categoriaRemoved => {
            if (!categoriaRemoved) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado la categoría que se desea eliminar'
                });
            }
            // Si no hay error, obtenemos la categoría eliminada
            return res.status(200).send({
                status: 'Ok',
                categoriaRemoved
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'Error',
                message: 'Error al eliminar la categoría',
                error: err
            });
        });
},

// Actualizar categoría
update: (req, res) => {
    var categoriaId = req.params.id;
    var params = req.body;
    const nombre = params.nombre;
    const descripcion = params.descripcion;

    Categoria.findOneAndUpdate({ _id: categoriaId }, { nombre: nombre, descripcion: descripcion }, { new: true })
        .then(categoriaUpdated => {
            if (!categoriaUpdated) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'La categoría no existe'
                });
            }
            // Si todo va bien
            return res.status(200).send({
                status: 'Ok',
                categoriaUpdated
            });
        })
        .catch(err => {
            // Manejamos el error
            return res.status(500).send({
                status: 'Error',
                message: 'Error al actualizar la categoría',
                error: err
            });
        });
}
// fin controller
}

module.exports = controller;