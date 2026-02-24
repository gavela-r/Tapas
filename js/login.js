const form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    function guardarToken(token){
        localStorage.setItem('token', token);
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    let option = {
        method: 'post',
        mode: 'cors',
        header: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(data),
    }

    fetch('http://localhost/DWES/www/proyectoTapasJs/php/login.php', option)
    .then(res =>{
        if(res.status === 200){
            return res.json();
        }else{
            alert('Usuario o contraseña incorrectos');
        }
    })
    .then(data =>{
        guardarToken(data.token);
        window.location.href = 'index.html';
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('tipo', data.rol);
       
    })

})