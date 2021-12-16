var html_temporal;

// validar si esta logeado o no
function Validar_Login(){
    localStorage.setItem("usr_asientos", asientos_seleccionados) ;
    var user_local=localStorage.getItem("usr_id")
    if(user_local==''||user_local==null){
        // alert("Falta iniciar sesión")
        var url3="./páginas/inciar_sesion.html";
        fetch(url3)
            .then((response) => response.text())
            .then(function (html){ 
                document.getElementById("info_general").style.visibility ="hidden"
                document.getElementById("Visualizar_login").innerHTML = html;   
            }) 
             
    }
    else{
        // alert("Momento de Pagar")
        Load_Pay()
    }
}

// consultamos a la base de datos el usuario
 async function Confirmar_login(){  
        
            var URL4= 'https://webapi20211215215815.azurewebsites.net/api/cuentas?id='+ document.getElementById("correo").value 
            const response  = await fetch(URL4)  
            const usr = await response.json();
            console.log(usr.Password)
            var clav=  document.getElementById("contrasena").value
            if(usr.Password==clav){
                alert("Bienvenido "+ usr.Nombres )
                document.getElementById("Visualizar_login").style.visibility ="hidden" 
                document.getElementById("info_general").style.visibility ="visible"  
                localStorage.setItem("usr_id", usr.IdUsuario) 
                localStorage.setItem("usr_nombre", usr.Nombres) 
                // alert("Momento de Pagar")
                myFunction2() 
            }
            else{
                alert("Clave incorrecta")
            }

}

// pasarela de pagos
  function   Load_Pay(){

    
    var Url5 = "./páginas/tarjeta.html"
     fetch(Url5)
    .then( (response)=>  response.text())
    .then(html =>{
        console.log(html)
        document.getElementById("ocultar").innerHTML = html;
        document.getElementById("ocultar").style.background="#EFFADA"
        document.getElementById("ocultar").style.height="500px"
    })
    

}

// Cerramos sesión
function CerraSesion(){
    localStorage.setItem('usr_id','')
    localStorage.setItem('usr_nombre','')
    location.reload(); 
    myFunction2()
}

// mostrar el usuario que esta registrado
function myFunction2(){
    // alert("Ya cargo")
    // localStorage.setItem('usr_id','')
    // localStorage.setItem('usr_nombre','')
    var xxx=localStorage.getItem("usr_id")
    if(xxx==''||xxx==null){ 
        document.getElementById("Logeo-img").innerHTML="Iniciar Sesión"
        document.getElementById("Logeo-img").onclick = Validar_Login
        document.getElementById("Menu-login").style.visibility="hidden"
    }
    else{
        document.getElementById("Logeo-img").innerHTML= localStorage.getItem('usr_id')
        document.getElementById("Menu-login").style.visibility="visible"

    }

}
  
// invocar html
function call_html(url_pagina,id_html){
    var xxxx= './páginas/'+url_pagina
    fetch(xxxx)
    .then(response => response.text())
    .then(html=>{
        document.getElementById(id_html).innerHTML=html
    })
} 
  
//guardar los datos del formulario
function Guardar_nuevo(){
    
    var tmp_idusr= document.getElementById("form_idusuario").value
    var tmp_nombe= document.getElementById("form_nombre").value
    var tmp_correo= document.getElementById("form_correo").value
    var tmp_contra= document.getElementById("form_contra").value
    var tmp_cel= document.getElementById("form_cel").value
    var tmp_email= document.getElementById("form_correo").value
    var tmp_dni= document.getElementById("form_dni").value
    var tmp_ciudad= document.getElementById("form_ciudad").value
     

    let s= new Date().toLocaleString(); 


    var Data={
        "IdUsuario":tmp_idusr,
        "DocumentoIdentidad":tmp_dni,
        "Nombres":tmp_nombe,
        "Telefono":tmp_cel,
        "Correo":tmp_correo,
        "Ciudad":tmp_ciudad,
        "Password":tmp_contra,
        "FechaRegistro": "2021-10-23 23:22:42.000",  
    }
    var Cuerpo ={
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      }
      console.log(JSON.stringify(Data))
            
        console.log("Prueba Api:")

        var UrlApi = "https://webapi20211215215815.azurewebsites.net/api/Cuentas/"

            fetch(UrlApi,Cuerpo)
            .then((response) => {return response.json() })
            .then( data =>
                    {  
                        if(data){
                            alert("Realizado")
                            document.getElementById("info_general").style.display = "block";
                            document.getElementById("info_general").style.visibility = "visible";
                            document.getElementById("info_general").innerHTML=html_temporal
                            document.getElementById("Visualizar_login").style.visibility="hidden"
                            localStorage.setItem('usr_id',document.getElementById("form_idusuario").value)
                            myFunction2();

                        }else{
                            alert("Ha ocurrido un error vuelve a intentarlo")
                        } 
                     }
                )    

}

//funcion para mostrar formulario de registro
function Registrate(){
    var url3="./páginas/Registro.html";
    fetch(url3)
        .then((response) => response.text())
        .then(function (html){ 
            html_temporal=document.getElementById("info_general").innerHTML;
            document.getElementById("info_general").style.display = "none";
            document.getElementById("Visualizar_login").innerHTML = html;   
        }) 
}

//funcion para mostrar contenido del formulario recuperar clave
function Recuperar(){
    var xxxax= './páginas/Recuperar.html' 
    fetch(xxxax)
    .then(response => response.text())
    .then(html=>{
        html_temporal=document.getElementById("info_general").innerHTML;
            document.getElementById("info_general").style.display = "none";
            document.getElementById("Visualizar_login").innerHTML = html; 
    })
}

//Enviar correo de reestablecimiento
function EnviarCorreo(){

    var tmp_correos=document.getElementById("recupera_correo").value
    var UrlApi = 'http://190.117.100.177:4040/api/recuperar?id='+tmp_correos
    
    fetch(UrlApi)
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Usur no encontrado");
        }
      })
    .then( data =>
            {  
                if(data){
                    alert("Correo Enviado")
                }
                else{
                    alert("Correo no valido vuelve a intentar")
                } 
                                                
            }
        )
   

}

function RegresarEnvioCorreo(){
    document.getElementById("info_general").style.display = "block";
    document.getElementById("info_general").style.visibility = "visible";
    document.getElementById("info_general").innerHTML=html_temporal
    document.getElementById("Visualizar_login").style.visibility="hidden"
}