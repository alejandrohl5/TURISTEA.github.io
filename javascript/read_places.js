function  myFunction() {
    var destino_a  = document.getElementById("d_ida").value;
    var destino_b  = document.getElementById("d_tur").value;
    var fecha_a =  document.getElementById("fet").value+':00'; 
    
    document.getElementById("Resultado").innerHTML=''
    var URL = "http://localhost:58683/api/viaje?origen="+destino_a+"&destino="+destino_b+"&fecha_salida="+fecha_a
     
    fetch(URL)
    .then(response => response.json())  
    // .then(data =>console.log(data)) 
    .then( data => {
        let almacenar = data;
        for (var item in almacenar){
            console.log(almacenar[item].codigo)
            document.getElementById("Resultado").innerHTML+=almacenar[item].codigo+'<br>'
             

            var a_libres=almacenar[item].asientos_libres
            a_libres= a_libres.replaceAll(',', '')

            console.log(a_libres.length/2)

            document.getElementById("Resultado").innerHTML+=
            '<div class="super1  border border-dark border-3 bg-light">'+
                '<div class="super2 row">'+
                    '<div class="col-6">'+
                        almacenar[item].origen+'---->'+ almacenar[item].destino+
                    '</div>'+
                    '<div class="col-6">Desde S/.'+
                         almacenar[item].costo_piso2+
                    '</div>'+
                '</div>'+

                '<div class="super2 row d-flex">'+
                     '<div class="col-4"> Hora de Salida '+
                        almacenar[item].fecha_salida+
                     '</div>'+
                    '<div class="col-4">Hora de llegada '+
                        almacenar[item].fecha_llegada+
                     '</div>'+
                    '<div class="col-4">'+
                        '<button class="" onclick=Comprar("'+almacenar[item].codigo+'")>Comprar</button>'+
                    '</div>'+
                '</div>'+
 
                '<div class="super2 row">'+
                     '<div class="col-6"> Asientos Libres:  '+
                        a_libres.length*0.5+
                     '</div>'+
                '<div class="col-6">Conductor -  '+
                        almacenar[item].conductor+
                     '</div>'+
                '</div>'+

            '</div>'

        }
    } ) 
 
 
} 
function Comprar(id_compra){

    alert(id_compra)
}



