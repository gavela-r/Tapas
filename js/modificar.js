let nombreDeBar = document.getElementById('nombreBar');
let nombreDeTapa = document.getElementById('nombreTapa');
let descripcion = document.getElementById('descripcion');
let titulo = document.getElementById('titulo');
let direccion = document.getElementById('direccion');
let telefono = document.getElementById('telefono');
let latitud = document.getElementById('latitud');
let longitud = document.getElementById('longitud');
let horaApertura = document.getElementById('hora_apertura');
let HoraCierre = document.getElementById('hora_cierre');
let ingredientes = document.getElementById('ingredientes');


 //Con esta funcion hacemos que el formulario se rellene con los datos de cada tapa
 //para que el usuario pueda modificarla
export function placeholderModificacion(data){
    titulo.textContent = 'Modificar Tapa';
    for(let bares of data){
        if(localStorage.getItem('id_tapa') === bares.id_tapa){
            nombreDeBar.value = bares.nombre_bar;
            nombreDeTapa.value = bares.nombre_tapa;
            descripcion.value = bares.descripcion;
            direccion.value = bares.direccion;
            telefono.value = bares.telefono;
            latitud.value = bares.latitud;
            longitud.value = bares.longitud;
            horaApertura.value = bares.hora_apertura;
            HoraCierre.value = bares.hora_cierre;
            ingredientes.value = bares.ingredientes;
        }
    }
}

