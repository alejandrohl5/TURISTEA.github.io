function  myFunction() {
    var destino_a  = document.getElementById("d_ida").value;
    var destino_b  = document.getElementById("d_tur").value;
    var fecha_a =  document.getElementById("fet").value+':00'; 
    
    var URL = "http://localhost:58683/api/viaje?origen="+destino_a+"&destino="+destino_b+"&fecha_salida="+fecha_a
    alert(URL)
    fetch(URL)
    .then(response => response.json())  
    // .then(data =>console.log(data)) 
    .then( data => {
        let almacenar = data;
        for (var item in almacenar){
            console.log(almacenar[item].codigo)
            document.getElementById("Resultado").innerHTML+=almacenar[item].codigo+'<br>'
        }
    } ) 
 
 
}

