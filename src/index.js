'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;


//Archivos estáticos:
app.use(express.static(path.join(__dirname, 'public')));


const url = "mongodb://localhost:27017/tienda";
// Configuracion para evitar fallo de conexion
mongoose.Promise = global.Promise;

// Agregamos los archivos de rutas
var categoriaRoutes = require('./routes/categoria');
var clienteRoutes = require('./routes/cliente');
var proveedorRoutes = require('./routes/proveedor');
var membresiaRoutes = require('./routes/membresia');
var productoRoutes = require('./routes/producto');

// Cargamos body parser
app.use(bodyParser.urlencoded({extended:false}));

// Cualquier peticion la convertimos  a JSON
app.use(bodyParser.json());

// Hay que activar algo llamado CORS para permitir
// peticiones HTTP y AJAX(no hago estas ultimas)
// desde el front-end
app.use((req,res,next)=>{
 res.header('Access-Control-Allow-Origin','*');
 res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 res.header('Allow','GET, POST, PUT, DELETE, OPTIONS');
 next();
});

// cargamos los archivos de la ruta de la app:
app.use('/api',categoriaRoutes);
app.use('/api',clienteRoutes);
app.use('/api',proveedorRoutes);
app.use('/api',membresiaRoutes);
app.use('/api',productoRoutes);

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log('Conexión a la bd realizada con exito!!')
    app.listen(port,()=>{
        console.log("Servidor ejecutandose en el puerto " + port);
        })
})

