import { render, renderPages } from "./creadorTapas.js";
import { limpiarFormulario } from "./insertar.js";

let insertar = document.getElementById('insertar');
let filtrarFav = document.getElementById('filtroFav');

window.addEventListener('click', ()=>{
    comprobacionToken();
})

window.addEventListener('DOMContentLoaded', ()=>{
    comprobacionToken()
})

function comprobacionToken(){
    
    if(localStorage.getItem('invitado') === null){
        const urlJWT = "http://localhost/DWES/www/proyectoTapasJs/php/jwt.php";
        let datos = {
            nombre: localStorage.getItem('nombre'),
            tipo: localStorage.getItem('tipo'),
            token: localStorage.getItem('token'),
        }
    
        let options = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(datos),
        }
    
        fetch(urlJWT, options)
        .then(res =>{
            if(res.status !== 200){
                alert("Se a producido un error, recarge la pagina");
                logOut();
                window.location.href = 'index.html';
            }
        })
    }
}
insertar.addEventListener('click', ()=>{
    let formInsertar = document.getElementById('formInsertar');
    let insertarBotones = document.getElementById('botones');
    let tapas = document.getElementById('tapas');
    let titulo = document.getElementById('titulo');
    
    while(insertarBotones.firstChild){
        insertarBotones.firstChild.remove();
    }
    
    let enviar = document.createElement('input');
    enviar.type = 'submit';
    enviar.name = 'enviar';
    enviar.value = 'Enviar';
    enviar.class = 'enviar';
    enviar.setAttribute('id', 'enviar');
    insertarBotones.append(enviar);

    // while(insertarIngredientes.firstChild){
    //     insertarIngredientes.firstChild.remove();
    // }
    titulo.textContent = 'Insertar tapa';
    
    formInsertar.style.display = 'flex';
    tapas.style.display = 'none';
    limpiarFormulario();
})
let favoritos = false;
filtrarFav.addEventListener('click', ()=>{
    const urlJWT = "http://localhost/DWES/www/proyectoTapasJs/php/jwt.php";
    let datos = {
        nombre: localStorage.getItem('nombre'),
        tipo: localStorage.getItem('tipo'),
        token: localStorage.getItem('token'),
    }

    let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(datos),
    }

    fetch(urlJWT, options)
    .then(res =>{
        if(res.status === 200){
            const url = 'http://localhost/DWES/www/proyectoTapasJs/php/landingpage.php'
            let formData = {
                nombre : localStorage.getItem('nombre'),
                enviar : 'enviar'
            }
            if(favoritos){
               delete formData.enviar;    
               favoritos = false;
               filtrarFav.textContent = 'Ver mis favoritos';
            }else{
                favoritos = true;
                filtrarFav.textContent = 'Ver todas las tapas';
            }
            let option = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            }
            fetch(url, option)
            .then(res=>{
                if(res.status == 200){
                    return res.json();
                }
            })
            .then((data)=>{ 
                renderPages();
                render(data);
            })
        }else{
            alert("Se a producido un error, recarge la pagina");
            logOut();
            window.location.href = 'index.html';
        }
    })

})

export function comprobarUsuario(){
    
    let acceso = document.getElementById('acceso');

    if(localStorage.getItem('tipo') === null){
        localStorage.setItem('invitado', 'invitado');
        acceso.style.display = 'block';
        let eliminar = document.getElementById('eliminar');
        let modificar = document.getElementById('modificarModal');
        let favoritos = document.getElementById('filtroFav');
        favoritos.style.display = 'none';
        eliminar.style.display = 'none';
        modificar.style.display = 'none';
        return false;
    }else{
        localStorage.removeItem('invitado');
        controlUsuarios();
        return true;
    }
}

//con esta funcion controlamos si un usuario logeado es admin o user normal 
// si el usuario logeado es admin, este proda añadir, modificar o eliminar 
//si el usuario es user, este solo podra ver la galeria de tapas y añadir tapas a favoritos
export function controlUsuarios(){

    if(localStorage.getItem('tipo') === 'admin'){
        
        identificadorUsuario();

    }else if(localStorage.getItem('tipo') === 'user'){
        
        identificadorUsuario();

        let insertar = document.getElementById('insertar');
        let eliminar = document.getElementById('eliminar');
        let modificar = document.getElementById('modificarModal');
    
        insertar.style.display = 'none';
        eliminar.style.display = 'none';
        modificar.style.display = 'none';
    }
}
//con esta funcion permitimos al usuario poder cerrar sesion
export function logOut(){
    let userIdentificado = document.getElementById('userIdentificado');
    userIdentificado.style.display = 'none';
    
    localStorage.removeItem('tipo');
    localStorage.removeItem('nombre');
    localStorage.removeItem('token');
    window.location.href = './index.html';
}


//con esta funcion reutilizamos el codigo para poner el nombre de un usuario normal o un admin
//
function identificadorUsuario(){
    let acceso = document.getElementById('acceso');
    acceso.style.display = 'none';
    
    let userIdentificado = document.getElementById('userIdentificado');
    let identificador = document.getElementById('identificador');
    let logout = document.getElementById('logOut');
        
        
    identificador.textContent = localStorage.getItem('nombre');
    userIdentificado.style.display = 'block';
    logout.addEventListener('click', logOut);
}

window.addEventListener('DOMContentLoaded', function(){

    if(localStorage.getItem('tipo') === 'admin' || localStorage.getItem('tipo') === 'user'){
        let tiempo = setInterval(() => {
            if(!confirm('Se a expirado la sesion, ¿Desea renovar la sesion?')){
                clearInterval(tiempo);
                location.reload();
                localStorage.removeItem('nombre');
                localStorage.removeItem('tipo');
                localStorage.removeItem('token');
                alert("Se ha cerrado la sesion, inicie sesion de nuevo");
            }
        }, 1000 * 60 * 60);
    }
})

