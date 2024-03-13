'use strict'

var Producto = require('../models/producto');

//Objeto controller que dispone de todas
//las funciones para el objeto producto

var controller = {
        // Método para guardar un producto
        save: (req,res)=>{
            // Obtenemos los datos
            var params = req.body;
    
            // Objeto a guardar
            var producto = new Producto({
                nombre: params.nombre,
                precio: params.precio,
                caducidad: params.caducidad,
                stock: params.stock,
                proveedor: {
                    nombre: params.proveedor.nombre,
                    razonSocial: params.proveedor.razonSocial,
                    direccion: params.proveedor.direccion,
                    correo: params.proveedor.correo,
                    telefono: params.proveedor.telefono
                },
                categoria:{
                    nombre:params.categoria.nombre,
                    descripcion:params.categoria.descripcion
                }
            });
            // Guardamos el proveedor en la BD
            producto.save()
            .then(productoStored => {
                // Devolvemos una respuesta si todo va bien
                return res.status(200).send({
                    status: 'success',
                    productoStored
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guardar el producto',
                    error: err
                });
            });
        },

    // Método para obtener una lista de proveedores
    getProducto: (req, res) => {
        Producto.find().limit(10) // Limitamos la cantidad de resultados a 10
            .then(productos => {
                // Devolvemos una respuesta con los proveedores encontrados
                return res.status(200).send({
                    status: 'success',
                    productos
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al obtener los productos',
                    error: err
                });
            });
    },
    // Eliminar productos
    delete: (req, res) => {
        var productoId = req.params.id;
        Producto.findOneAndDelete({ _id: productoId })
            .then(productoRemoved => {
                if (!productoRemoved) {
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No se ha encontrado el producto que se desea eliminar'
                    });
                }
                // Si no hay error, obtenemos la categoría eliminada
                return res.status(200).send({
                    status: 'Ok',
                    productoRemoved
                });
            })
            .catch(err => {
                // Manejamos el error
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al eliminar el producto',
                    error: err
                });
            });
    },
    // Actualizar membresia
    update:(req,res) => {
        var productoId = req.params.id;
        var params = req.body;
        const nombre = params.nombre;
        const precio = params.precio;
        const caducidad = params.caducidad;
        const stock = params.stock;
        const proveedor  = params.proveedor;
        const categoria = params.categoria;

     // Realizar la actualización en la base de datos
     Producto.findOneAndUpdate(
        { _id: productoId },
        {
            nombre: nombre,
            precio: precio,
            caducidad: caducidad,
            stock:stock,
            proveedor: {
                nombre: proveedor.nombre,
                razonSocial: proveedor.razonSocial,
                direccion:proveedor.direccion,
                correo:proveedor.correo,
                telefono:proveedor.telefono
            },
            categoria:{
                nombre:categoria.nombre,
                descripcion:categoria.descripcion
            }
        },
        { new: true } // Para devolver el documento actualizado
    )
    .then(productoRemoved => {
        if (!productoRemoved) {
            return res.status(404).send({
                status: 'Error',
                message: 'El producto no existe'
            });
        }
        // Si todo va bien
        return res.status(200).send({
            status: 'Ok',
            productoRemoved
        });
    })
    .catch(err => {
        // Manejar el error
        return res.status(500).send({
            status: 'Error',
            message: 'Error al actualizar el producto',
            error: err
        });
    });
    }
}

module.exports = controller;