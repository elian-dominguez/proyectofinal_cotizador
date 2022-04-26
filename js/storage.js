var marcaSeleccionada = $('#marca').val()
var modeloSeleccionado = $('#modelo').val();
var yearSeleccionado = $('#year').val();

$(document).ready(function () {
    $('#botonCotizar').click(function () {
        /*Captura de datos escrito en los inputs*/
        var mar = document.getElementById("marca").value;
        var mod = document.getElementById("modelo").value;
        /*Guardando los datos en el LocalStorage*/
        localStorage.setItem("Marca", JSON.stringify($('#marca').val()));
        localStorage.setItem("Modelo", JSON.stringify($('#modelo').val()));
        localStorage.setItem("Año", JSON.stringify($('#year').val()));
        localStorage.setItem("GNC", JSON.stringify($('#gnc').val()));
    });
});

/*Funcion Cargar y Mostrar datos*/
$(document).ready(function () {
    $('#botonCargar').click(function () {
        /*Obtener datos almacenados*/
        var marca1 = JSON.parse(localStorage.getItem("Marca"));
        var modelo1 = JSON.parse(localStorage.getItem("Modelo"));
        var year1 = JSON.parse(localStorage.getItem("Año"));
        var gnc1 = JSON.parse(localStorage.getItem("GNC"));
        /*Mostrar datos almacenados*/
        document.getElementById("datosGuardados").innerHTML = `
                                         <table class="table">
                                            <thead class="table-danger">
                                                <tr>
                                                    <th>GNC</th>
                                                    <th>Marca</th>
                                                    <th>Modelo</th>
                                                    <th>Año</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="table-danger">
                                                    <td>${gnc1.toUpperCase().toUpperCase().replace('-', ' ')}</td>
                                                    <td>${marca1.toUpperCase().toUpperCase().replace('-', ' ')}</td>
                                                    <td>${modelo1.toUpperCase().toUpperCase().replace('-', ' ')}</td>
                                                    <td>${year1.toUpperCase().toUpperCase().replace('-', ' ')}</td>
                                                </tr>`;
        setTimeout(() => {
            $('#datosGuardados').remove();
        }, 4000);
    });
});
