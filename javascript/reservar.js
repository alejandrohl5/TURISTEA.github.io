// Se confirma la reserva de asientos
function Reservar() {
  var usrid = localStorage.getItem('usr_id')
  var usrnom = localStorage.getItem('usr_nombre')
  var usrasiento = localStorage.getItem('usr_asientos')
  var usrviaje = localStorage.getItem('usr_id_viaje')

  var Data = {
    "codigo": usrviaje,
    "asientos_libres": usrasiento,
    "conductor": usrid
  }
  var Cuerpo = {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Data),
  }


  console.log("Prueba Api:")

  var UrlApi = "http://localhost:58683/api/viaje/"

  fetch(UrlApi, Cuerpo)
    .then((response) => { return response.json() })
    .then(data => {
      var mostrar = data.length * 0.5
      for (var x = mostrar; x < data.length - 1; x++) {
        console.log(data[x].resultado)
        document.getElementById("Resultado_Compra_cuerpo").innerHTML += '<li class="list-group-item">' + data[x].resultado + '</li>'
      }
      document.getElementById("Resultado_Compra_cuerpo").innerHTML += '<li class="list-group-item"> <b> No olvides presentar tu carnet de vacunación al momento del viaje</b> <br> Puedes visualizar tus viajes ingresando al Menu superior "Mi cuenta"-> "Mis viajes"</li> '
    }
    )
}
