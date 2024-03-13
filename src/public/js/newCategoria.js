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

    if (nombre == '' || descripcion == '') {
        $("#alert").show();
    } else {

        //guardamos datos en la base de datos 
        postData(nombre, descripcion);
    }

}

async function postData(nombre, descripcion) {
    const response = await fetch('/api/crear', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'nombre': nombre,
            'descripcion': descripcion
        })

    });

    const data = await response.json();
    console.log(data);
}