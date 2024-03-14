const btn = document.getElementById('btn');

$(document).ready(function() {
    $("#alert").hide();
});

$("#btn-alert").click(function() {
    $("#alert").hide();
});

btn.onclick = () => {
    const nombre = document.getElementById('nombre').value;
    const apellidoPaterno = document.getElementById('apellidoPaterno').value;
    const apellidoMaterno = document.getElementById('apellidoMaterno').value;
    const rfc = document.getElementById('rfc').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const sexo = document.getElementById('sexo').value;

    if (nombre == '' || apellidoPaterno=='' || apellidoMaterno=='' || rfc=='' || correo=='' || telefono=='' ||sexo=='' ) {
        $("#alert").show();
    } else {

        //guardamos datos en la base de datos 
        postData(nombre, apellidoPaterno, apellidoMaterno, rfc, correo, telefono, sexo);
    }

}

async function postData(nombre, apellidoPaterno, apellidoMaterno, rfc, correo, telefono, sexo) {
    const response = await fetch('/api/crearCliente', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'nombre': nombre,
            'apellidoPaterno':apellidoPaterno, 
            'apellidoMaterno': apellidoMaterno, 
            'rfc':rfc, 
            'correo':correo, 
            'telefono': telefono, 
            'sexo:': sexo
        })

    });

    const data = await response.json();
    console.log(data);
}