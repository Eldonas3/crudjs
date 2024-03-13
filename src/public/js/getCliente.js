const { getCliente } = require("../../controllers/cliente");

async function getCliente() {
    const response = await fetch('/api/mostrarCliente');
    const data = await response.json();
    console.log(data);
    const showCliente = document.getElementById('show-cliente');

    if (data.cliente.length == 0) {

        $('#message').text('No existen notas que mostrar');

    } else {
        $('#message').text('');

        for (let i = 0; i < data.cliente.length; i++) {

            const id = data.cliente[i]._id;

            //Elementos y botones para la vista
            const nombre = document.createElement('h5');
            const apellidoPaterno = document.createElement('h5');
            const apellidoMaterno = document.createElement('h5');
            const rfc = document.createElement('h5');
            const correo = document.createElement('h5');
            const telefono = document.createElement('h5');
            const sexo = document.createElement('h5');
            const btnDelete = document.createElement('button');
            const btnShow = document.createElement('button');
            const btnEdit = document.createElement('button');

            //Contenedores
            const cliente = document.createElement('div');
            const btnDiv = document.createElement('div');
            const btnForm = document.createElement('form');

            cliente.className = 'card mb-3 px-2 py-2 card-note';
            btnDiv.className = 'd-flex flex-row mt-2';

            //Asignamos los valores
            nombre.textContent = data.cliente[i].nombre;
            apellidoPaterno.textContent = data.cliente[i].apellidoPaterno;
            apellidoMaterno.textContent = data.cliente[i].apellidoMaterno;
            rfc.textContent = data.cliente[i].rfc;
            correo.textContent = data.cliente[i].correo;
            telefono.textContent = data.cliente[i].telefono;
            sexo.textContent = data.cliente[i].sexo;

            //Características de los botones del DOM:
            btnShow.className = 'btn btn-primary btn-sm';
            btnShow.id = "show" + i;
            btnShow.textContent = 'Mostrar';
            btnShow.type = "button";

            btnEdit.className = 'btn btn-success btn-sm mx-3';
            btnEdit.id = "edit" + i;
            btnEdit.textContent = 'Editar';
            btnEdit.type = "button";

            btnDelete.className = 'btn btn-danger btn-sm';
            btnDelete.id = "delete" + i;
            btnDelete.textContent = 'Eliminar';
            btnDelete.type = "submit";

            //Añadimos los elementos del DOM

            categoria.append(nombre);
            categoria.append(apellidoPaterno);
            categoria.append(apellidoMaterno);
            categoria.append(rfc);
            categoria.append(correo);
            categoria.append(telefono);
            categoria.append(sexo);
            btnDiv.append(btnShow);
            btnForm.append(btnEdit);
            btnForm.append(btnDelete);
            btnDiv.append(btnForm);

            cliente.append(btnDiv);
            showCliente.append(cliente);

            //Botón mostrar show
            btnShow.onclick = () => {

                $('#myModalCliente').modal('show');
                $('#modal-title').text(data.cliente[i].nombre);
                $('#content-body').text(data.cliente[i].apellidoPaterno);
                $('#content-body').text(data.cliente[i].apellidoMaterno);
                $('#content-body').text(data.cliente[i].rfc);
                $('#content-body').text(data.cliente[i].correo);
                $('#content-body').text(data.cliente[i].telefono);
                $('#content-body').text(data.cliente[i].sexo);


            }

            //Botón de eliminar:      
            btnDelete.onclick = () => {
                console.log(id);
                deleteCliente(id);
            }

            //Botón de editar:      
            btnEdit.onclick = () => {
                const nombre = data.cliente[i].nombre;
                const apellidoPaterno = data.cliente[i].apellidoPaterno;
                const apellidoMaterno = data.cliente[i].apellidoMaterno;
                const rfc = data.cliente[i].rfc;
                const correo = data.cliente[i].correo;
                const telefono = data.cliente[i].telefono;
                const sexo = data.cliente[i].sexo;
                window.location.href = 'edit.html?id=' + id + '&nombre=' + nombre + '&apellidoPaterno=' + apellidoPaterno
                + '&apellidoMaterno=' + apellidoMaterno + '&rfc=' + rfc + '&correo=' + correo + '&telefono=' + telefono + '&sexo=' + sexo;

            }
        }
    }

}


//Función para eliminar una nota

async function deleteCliente(id) {
    await fetch('api/eliminarCliente' + id, {
        method: 'DELETE'
    }).then(res => res.text()).then(res => console.log(res))
}

getCliente(); 