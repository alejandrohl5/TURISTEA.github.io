// Mostrar los datos para luego modificarlos
function Misdatos(){

    var url45="./páginas/Misdatos.html";
    fetch(url45)
        .then((response) => response.text())
        .then(function (html){ 
            html_temporal=document.getElementById("reveal-datos").innerHTML;
            document.getElementById("reveal-datos").style.display = "none";
            document.getElementById("Visualizar_login").innerHTML = html;   
        }) 
 
    var id=localStorage.getItem('usr_id')
    var UrlApi = "https://webapi20211215215815.azurewebsites.net/api/cuentas?id="+id
    
                fetch(UrlApi)
                .then((response) => {
                    if (response.ok) {
                      return response.json();
                    } else {
                      alert("No hay Datos del usuario");
                    }
                  })
                .then( data =>
                        {  
                        console.log(data)  
                        
                        document.getElementById("form_idusuario_recuperado").value=data.IdUsuario
                        document.getElementById("form_nombre_recuperado").value=data.Nombres
                        document.getElementById("form_correo_recuperado").value=data.Correo
                        document.getElementById("form_contra_recuperado").value=data.Password
                        document.getElementById("form_cel_recuperado").value=data.Telefono
                        document.getElementById("form_dni_recuperado").value=data.DocumentoIdentidad
                        document.getElementById("form_ciudad_recuperado").value=data.Ciudad



                        }
                    ) 
}
 
// Enviar a modificar los datos
function EnviarModificar(){
    var tmp_idusr= document.getElementById("form_idusuario_recuperado").value
    var tmp_nombe= document.getElementById("form_nombre_recuperado").value
    var tmp_correo= document.getElementById("form_correo_recuperado").value
    var tmp_contra= document.getElementById("form_contra_recuperado").value
    var tmp_cel= document.getElementById("form_cel_recuperado").value
    var tmp_email= document.getElementById("form_correo_recuperado").value
    var tmp_dni= document.getElementById("form_dni_recuperado").value
    var tmp_ciudad= document.getElementById("form_ciudad_recuperado").value
     

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
        method: 'PUT', // or 'PUT'
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
                            document.getElementById("reveal-datos").style.display = "block";
                            document.getElementById("reveal-datos").style.visibility = "visible";
                            document.getElementById("reveal-datos").innerHTML=html_temporal
                            document.getElementById("Visualizar_login").style.visibility="hidden"

                            localStorage.setItem('usr_id',document.getElementById("form_idusuario").value)
                            myFunction2();

                        }else{
                            alert("Ha ocurrido un error vuelve a intentarlo")
                        } 
                     }
                ) 
}


function Misviajes(){
  var id=localStorage.getItem('usr_id')
  var url451="https://webapi20211215215815.azurewebsites.net/api/Rolo?usuario="+id;
  html_temporal=document.getElementById("reveal-datos").innerHTML;
  document.getElementById("reveal-datos").innerHTML=''
  fetch(url451)
      .then((response) => response.json())
      .then( data => {
              
             var tm=data.length;
        
        for(var z=0;z<tm;z++){
 
          console.log(data[z].id_asientos)
          document.getElementById("reveal-datos").innerHTML+='<div class="container bg bg-dark bg-gradient text-center text-white border border-3 rounded-pill">'+data[z].id_asientos+' <br />'+data[z].id_usuario +'<br />'+data[z].id_viaje+' </div>'
        }
        document.getElementById("reveal-datos").innerHTML+='<div class="d-block text-center"><button type="button" class="btn btn-dark btn-outline-light" onclick="volver();"> Volver </button></div>'

        } 
        ) 
}

//volver de ver los viajes
function volver() {
  document.getElementById("reveal-datos").innerHTML=''
  document.getElementById("reveal-datos").innerHTML=html_temporal
}
