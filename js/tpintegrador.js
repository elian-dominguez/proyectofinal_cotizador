/*function (person) es lo mismo que (person) => */

function Auto(marca, anio, modelo) {
    this.marca = marca;
    this.anio = anio;
    this.modelo = modelo;
}

document.addEventListener('DOMContentLoaded', datosAuto);

function datosAuto() {
    $('#label-modelo').hide();
    datosFechaYAño();
    getJsonAuto();
}

function getJsonAuto(){ 
    $.ajax({
        url: 'storage.json',
        success: function (data) {
            listarMarcaModelo(data);
            console.log("success");
        },
        error: function (jqXHR, status, error) {
            console.log("Error");
            console.log(jqXHR);
            console.log(`Error -> Status: ${status} - Error: ${error}`)
        }
    });
};

function listarMarcaModelo(jsonAutos) {
    const marcaSeleccionada = document.querySelector('#marca');
    const modeloSeleccionado = document.querySelector('#modelo');

    var marcas = listaCreada(jsonAutos, "marca");
    selectCargados(marcas, marcaSeleccionada); 

    marcaSeleccionada.addEventListener('change', function (e) {
        $('#label-modelo').fadeIn('slow');
        modeloSeleccionado.innerHTML = '<option value="">- Modelo -</option>';

        var modelos = jsonAutos.filter(elem => elem.marca.toLowerCase().replace(' ', '-') == e.target.value);

        var listaModelos = listaCreada(modelos, "modelo");

        selectCargados(listaModelos, modeloSeleccionado);
    });

    form.addEventListener('submit', datosSubmit);
}

function datosFechaYAño() {
    var max = new Date().getFullYear(),
        min = max - 25;

    var anio = document.getElementById("year");

    for (let i = max; i > min; i--) {
        let opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        anio.appendChild(opcion);
    } 
}

function listaCreada(arreglo, claveMarca) {
    var lista = [];

    arreglo.forEach(e => {
        if (!lista.includes(e[claveMarca])) {
            lista.push(e[claveMarca]);
        }
    })
    return lista; /*sort()*/
}

function selectCargados(arreglo, select) {
    arreglo.forEach(e => {
        let opcion = document.createElement('option');
        opcion.value = e.toLowerCase().replace(' ', '-');
        opcion.textContent = e;
        select.appendChild(opcion);
        console.log()
    })
}

const form = document.getElementById('cotizar');

/*usando jquery */
function datosSubmit(e) {
    e.preventDefault();

    let marcaObtenida = $('#marca').val();
    let modeloObtenido = $('#modelo').val();
    let yearObtenido = $('#year').val();
    let gncObtenido = $('#gnc').val();

    $('#spinner').removeClass('invisible');

    setTimeout(() => {
        $('#spinner').addClass('invisible');
            if ($('#marca').val() === '' || $('#modelo').val() === '' || $('#year').val() === '' || $('#gnc').val() === ''){
                document.querySelector('#envio').innerHTML = `<div class="alert alert-danger" role="alert"> Cotización fallida. Faltan completar campos!
                                    </div>`;
        setTimeout(() => {
            $('#envio').remove();
        }, 3000);
    } else {
        /*document.querySelector('#marca').innerHTML = `- Marca - `*/
        document.querySelector('#envio').innerHTML = `
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
                                                    <td>${gncObtenido.toUpperCase().replace('-', ' ')}</td>
                                                    <td>${marcaObtenida.toUpperCase().replace('-', ' ')}</td>
                                                    <td>${modeloObtenido.toUpperCase().replace('-', ' ')}</td>
                                                    <td>${yearObtenido.toUpperCase().replace('-', ' ')}</td>
                                                </tr>`;
        setTimeout(() => {
            $('#envio').remove();
        }, 4000);
    }
    }, 4000);
}
