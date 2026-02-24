import { volver } from "./insertar.js";
import { comprobarUsuario, controlUsuarios } from "./landingPage.js";
import { placeholderModificacion } from "./modificar.js";

comprobarUsuario();

let numPage = 0;
let tapasPerPage = 6;
export function renderPages(){
    numPage = 0;
    let numeroPagina = document.getElementById('numPage');
    numeroPagina.textContent = numPage + 1;
}

//La principal funcionalidad es la creacion de las targetas de cada tapa
export function creadorTarjeta(data){
    // vamos a crear las tarjetas
    let btnAnterior = document.getElementById('btnAnterior');
    let btnSiguiente = document.getElementById('btnSiguiente');
    let numeroPagina = document.getElementById('numPage');
    
        function ocultarBoton(valor){
            if(valor == 'siguiente'){
                btnSiguiente.style.display = 'none';
            }else if(valor == 'atras'){
                btnAnterior.style.display = 'none';
            }
        }
    if(data.length < 8){
        btnAnterior.style.display = 'none'
        btnSiguiente.style.display = 'none';
        numeroPagina.style.display = 'none';
    }else{
        btnAnterior.style.display = 'block'
        btnSiguiente.style.display = 'block';
        numeroPagina.style.display = 'block';
    }

    let gridTapas = document.getElementById('tapasGrid');

    gridTapas.innerHTML = ''; 

    let inicio = numPage * tapasPerPage;
    let final = (numPage * tapasPerPage) + tapasPerPage;
    if(final >= data.length - 2){
        final = data.length - 1;
        ocultarBoton('siguiente');
    }else if(inicio <= 0){
        ocultarBoton('atras');
    }
    data.slice(inicio, final).forEach(element => {
        let tarjetaTapa = document.createElement('div');
        tarjetaTapa.className = 'tapasTitle'
        tarjetaTapa.setAttribute('tpsId', `${element.id_tapa}`);
        if(comprobarUsuario()){
            tarjetaTapa.append(creadorLike(data[data.length - 1], element.id_tapa)); 
        }
        
        tarjetaTapa.append(creadorNombreBar(element.nombre_bar)); 
        tarjetaTapa.append(creadorImagenTapa(element.foto));
        tarjetaTapa.append(creadorDescripcion(element.nombre_tapa, element.descripcion));
        tarjetaTapa.append(creadorBoton(data));
        tarjetaTapa.addEventListener('click', (e)=>{
            if(e.target.getAttribute('id') == 'informacion'){
                modalContenido(e.target.parentNode, data);
            }
        })
        gridTapas.append(tarjetaTapa);
    });
}

//La principal funcionalidad es la creacion de los botones de la modal
export function creadorBoton(){
    let button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#exampleModal');
    button.setAttribute('id', 'informacion')
    button.textContent ='Mas informacion';
    
    return button;
}

//Su funcion es crear el corazon de los favoritos 
function creadorLike(favoritos, id_tapa){
    let imgSvg = document.createElement('img');
    imgSvg.src = './svg/corazon.svg';
    for(let k = 0; k < favoritos.length; k++){
        if(favoritos[k].favoritos == id_tapa){
            imgSvg.src = './svg/heart-solid.svg';
        }
    }
    imgSvg.alt = 'Me gusta';
    imgSvg.className = 'like';
    imgSvg.addEventListener('click', (e)=>{meGusta(e)});

    return imgSvg;
}

//Su funcion es crear el nombre de cada bar en negrita
function creadorNombreBar(name){
    let nombreBar = document.createElement('p');
    let strong = document.createElement('strong');
    strong.innerText = name.trim();
    nombreBar.append(strong);
    return nombreBar;
}

//Esta funcion realiza la creacion de las imagenes de cada tapa
function creadorImagenTapa(imagen){
    let a = document.createElement('a');
    let img = document.createElement('img');
    img.src = imagen;
    img.alt = 'foto de tapas de ' ;
    a.append(img);
    return a;
    
}

//Esta funcion crea la descripcion  de cada tapa
function creadorDescripcion(nombre, descripcion){
    let div = document.createElement('div');
    let strong = document.createElement('strong');
    let br = document.createElement('br');

    div.className = 'descripcionTapas';
    strong.innerText = nombre;

    div.append(strong);
    div.append(br);
    div.append(`${descripcion}`);
    return div;
}

// La funcionalidad de esta funcion es el control de los corazones.
// si el corzon esta en blanco quiere decir que no esta añadida a favoritos 
// si el corazon esta relleno quiere decir que esta añadido a favoritos 
function meGusta(e){
    const url = 'http://localhost:8080/php/favoritos.php';
    let formData = new FormData();

    formData.append('nombre', localStorage.getItem('nombre'));
    formData.append('id_tapa', e.target.parentNode.getAttribute('tpsid'));
    
    let options = {
        method: 'POST',
        mode: 'cors',
        body:formData
    }
    fetch(url, options)
    .then(res=>{
        if(res.status == 201 || res.status == 200){
            if(e.target.attributes[0].value == './svg/corazon.svg'){
                e.target.src= './svg/heart-solid.svg';
            }else{
                e.target.src = './svg/corazon.svg';
            }
            return res.json();
        }else{
            alert("No se pudo añadir a favoritos")
        }
    })
}


// //Esta funcion crea la modal de cada tapa 
function modalContenido(elemento, data){

    let footerModal = document.getElementById('modalFooter');
    let infoModal ='<button type="button" class="btn btn-danger" id="eliminar">Eliminar</button><button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close">Cerrar</button><button type="button" class="btn btn-primary" id="modificarModal">Modificar</button>'
    footerModal.innerHTML = ' ';
    footerModal.innerHTML = infoModal;
    controlUsuarios();
    comprobarUsuario();
    for(let k in data){

        if(elemento.getAttribute('tpsid') == data[k].id_tapa){
            
            let tituloModal = document.getElementById('tituloModal');
            tituloModal.textContent= data[k].nombre_bar;
        }
        
    }
    
    let eliminarTapa = document.getElementById('eliminar');
    let cerrar = document.getElementById('cerrar');
    
    let btnModalmodificar = document.getElementById('modificarModal');

    let nombreTapaModal = document.getElementById('nombreTapaModal');
    for(let i of data){
        
        let id_tapa = elemento.getAttribute('tpsid', i.id_tapa)
        localStorage.setItem('id_tapa', id_tapa);
        
        if(id_tapa == i.id_tapa){
            nombreTapaModal.textContent = i.nombre_tapa;
            let ingredientes = document.getElementById('ingredientes');
            ingredientes.innerHTML = '';
                let li = document.createElement('li');
                li.innerHTML = i.ingredientes;
                ingredientes.append(li);

            let id = localStorage.getItem('id_tapa');
            eliminarTapa.addEventListener('click', () =>{
                let option = {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
                if(confirm('¿Estas seguro que desea eliminarlo?')){
                    fetch(`http://localhost:8080/php/eliminar.php?id=${id}`, option)
                    .then(res =>{
                        if(res.status === 200){
                            cerrar.click();
                            alert("Se a eliminado la tapa correctamente");
                            localStorage.removeItem('id_tapa');
                            dataTapas();
                        }else{
                            alert("No se pudo eliminar la tapa")
                        }
                    })
                }
            })
            
            btnModalmodificar.addEventListener('click', ()=>{
                let formInsertar = document.getElementById('formInsertar');
                let insertarBotones = document.getElementById('botones');
                let formulario = document.getElementById('formulario');
                let imagen = document.getElementById('foto');

                let tapas = document.getElementById('tapas');
                let enviar = document.getElementById('enviar');
                while(insertarBotones.firstChild){
                    insertarBotones.firstChild.remove();
                }

                insertarBotones.innerHTML = ''
                let btnModificar = document.createElement('input')
                btnModificar.type = 'submit';
                btnModificar.name = 'modificar';
                btnModificar.value = 'Modificar';
                btnModificar.class = 'modificar';
                btnModificar.setAttribute('id', 'modificar');
                insertarBotones.append(btnModificar);

                formInsertar.style.display = 'flex';
                tapas.style.display = 'none';
               
                formulario.onsubmit = (event)=>{
                    event.preventDefault();
                    
                    if(event.submitter.getAttribute('id') === 'modificar'){
                        
                        const formData = new FormData(formulario);
                        delete formData.foto;
                        formData.append('id_tapa', localStorage.getItem('id_tapa'));
                        formData.append("foto", imagen.files[0]);
                        let informacion = {}
                        for(let i of formData){
                            informacion[i] = i[1];
                        }

                        let option = {
                            method: 'POST',
                            mode: 'cors',
                            body: formData,
                        }

                        fetch('http://localhost:8080/php/modificar.php', option)
                        .then(res =>{
                            if(res.status === 200){
                                volver();
                                dataTapas();
                                return res.json();
                            }else{
                                alert("No se pudo modificar la tapa");
                            }
                        });
                    }
                }
                cerrar.click();
                placeholderModificacion(data);
                
            })
        }
    }
}

let option = {
    method: 'post',
    mode: 'cors',
    headers: {
        'Content-type': 'Aplication/json',
    },
    body: JSON.stringify({nombre:localStorage.getItem('nombre')}),
}
export function dataTapas(){
    fetch('http://localhost:8080/php/landingpage.php', option)
    
    .then(res =>{
        if(res.status == 200){
            return res.json();
        }else{
            alert('No se pudo encontrar ninguna tapa');
        }
    })
    
    .then(data =>{
        renderPages();
        render(data)
    })
}
export function render(data){
        creadorTarjeta(data);
        let btnAnterior = document.getElementById('btnAnterior');
        let btnSiguiente = document.getElementById('btnSiguiente');
        let numeroPagina = document.getElementById('numPage');
        
        btnSiguiente.onclick = function(){
            if(data.slice((numPage + 1) * tapasPerPage, ((numPage + 1) * tapasPerPage) + tapasPerPage).length > 0){
                numPage++;
                numeroPagina.textContent++;
                creadorTarjeta(data);
            }
        }

        btnAnterior.onclick = function(){
            if(numPage > 0){
                numPage--;
                numeroPagina.textContent--;
                creadorTarjeta(data);
            }
        }
}

dataTapas();