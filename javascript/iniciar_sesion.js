const guardar = document.querySelector('#formulario_login');

guardar.addEventListener('submit', (e) =>{
    e.preventDefault();
    const correo = document.querySelector('#correo').value;
    const contrasena = document.querySelector('#contrasena').value;

  
    alert("BIENVENIDO!!!")
    guardar.reset();

    auth
          .createUserWithEmailAndPassword(correo, contrasena)   

          .then(userCredential => {

              console.log('hecho con exito');

          })

          window.location.replace("http://127.0.0.1:5501/index.html");
   })

