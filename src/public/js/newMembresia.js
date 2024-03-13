const btn = document.getElementById('btn');

$(document).ready(function() {
    $("#alert").hide();
});

$("#btn-alert").click(function() {
    $("#alert").hide();
});

btn.onclick = () => {
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;

    if (nombre == '' || descripcion == '' || imagen == '') {
        $("#alert").show();
    } else {

        //guardamos datos en la base de datos 
        postData(nombre, descripcion, imagen);
    }

}

async function postData(nombre, descripcion, imagen) {
    const response = await fetch('/api/crearMembresia', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'nombre': nombre,
            'descripcion': descripcion,
            'imagen': imagen,
        })

    });

    const data = await response.json();
    console.log(data);
}