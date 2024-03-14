const { getCategoria } = require("../controllers/categoria");

async function getCategoria() {
    const response = await fetch('/api/mostrar');
    const data = await response.json();
    console.log(data);
    const showCategoria = document.getElementById('show-categoria');

    if (data.categoria.length == 0) {

        $('#message').text('No existen notas que mostrar');

    } else {
        $('#message').text('');

        for (let i = 0; i < data.categoria.length; i++) {

            const id = data.categoria[i]._id;

            //Elementos y botones para la vista
            const nombre = document.createElement('h5');
            const descripcion = document.createElement('p');
            const btnDelete = document.createElement('button');
            const btnShow = document.createElement('button');
            const btnEdit = document.createElement('button');

            //Contenedores
            const categoria = document.createElement('div');
            const btnDiv = document.createElement('div');
            const btnForm = document.createElement('form');

            categoria.className = 'card mb-3 px-2 py-2 card-note';
            btnDiv.className = 'd-flex flex-row mt-2';

            //Asignamos los valores
            nombre.textContent = data.categoria[i].nombre;
            descripcion.textContent = data.categoria[i].descripcion;;

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
            categoria.append(descripcion);
            btnDiv.append(btnShow);
            btnForm.append(btnEdit);
            btnForm.append(btnDelete);
            btnDiv.append(btnForm);

            categoria.append(btnDiv);
            showCategoria.append(categoria);

            //Botón mostrar show
            btnShow.onclick = () => {

                $('#myModal').modal('show');
                $('#modal-title').text(data.categoria[i].nombre);
                $('#content-body').text(data.categoria[i].descripcion);


            }

            //Botón de eliminar:      
            btnDelete.onclick = () => {
                console.log(id);
                deleteCategoria(id);
            }

            //Botón de editar:      
            btnEdit.onclick = () => {
                const nombre = data.notes[i].nombre;
                const descripcion = data.notes[i].descripcion;
                window.location.href = 'edit.html?id=' + id + '&nombre=' + nombre + '&descripcion=' + descripcion;

            }
        }
    }

}


//Función para eliminar una nota

async function deleteCategoria(id) {
    await fetch('api/eliminar' + id, {
        method: 'DELETE'
    }).then(res => res.text()).then(res => console.log(res))
}

getCategoria(); 