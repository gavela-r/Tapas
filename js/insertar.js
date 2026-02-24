import {dataTapas} from "./creadorTapas.js"

let formulario = document.getElementById('formulario');
let nombreBar = document.getElementById('nombreBar');
let nombreTapa = document.getElementById('nombreTapa');
let imagen = document.getElementById('foto');
let descripcion = document.getElementById('descripcion');
let button = document.getElementById('volver');


let añadirIngrediente = document.getElementById('masIngredientes')
let insertarIngredientes = document.getElementById('insertarIngredientes');

formulario.addEventListener('submit', (event)=>{
    event.preventDefault();
    if(event.submitter.getAttribute('id') === 'enviar'){
        const formData = new FormData(formulario);
        // let data = Object.fromEntries(formData);
        delete formData.foto;
        // data.foto = []
        formData.append("foto", imagen.files[0])
        let data = {};
        let contador = 0;
        for(let i of formData){
            data[i] = i[1];
        }
        
            let option = {
                method: 'post',
                mode: 'cors',
                body: formData,
            }
    
            fetch('http://localhost/DWES/www/proyectoTapasJs/php/insertar.php', option)
            .then(res=>{
                if(res.status === 201){
                    dataTapas();
                    volver();
                }else{
                    alert('No se pudo añadir la tapa, rellene los campos vacios');
                }
            })       
        
    }
})

button.addEventListener('click', volver);

//Con esta funcion podemos volver a la galeria de tapas
export function volver(){
    let formInsertar = document.getElementById('formInsertar');
    let tapas = document.getElementById('tapas');
    formInsertar.style.display = 'none';
    tapas.style.display = 'block';
}

//Con esta funcion limpiamos el formulario
export function limpiarFormulario(){
    nombreBar.value = ' ';
    nombreTapa.value = ' ';
    descripcion.value = ' ';
}


//Con esta funcion seleccionsmos una imagen predeterminada
export function imagenSeleccionada(){
    if(imagen.value == ''){
        return imagenesTapas['alitas'];
    }else{
        for(let imagenData in imagenesTapas){
            if(imagenData == imagen.value){
               return imagenesTapas[imagenData];
            }
        }
    }
}