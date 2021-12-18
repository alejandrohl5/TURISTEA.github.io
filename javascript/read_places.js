var a_libres
var tf 
var total =0;
var temporal 
var asientos_seleccionados=[]


// buscar y mostrar los viajes disponibles
function  myFunction() {
    // localStorage.setItem("usr_asientos", "") 
    // localStorage.setItem("usr_id_viaje", "") 
    var destino_a  = document.getElementById("d_ida").value;
    var destino_b  = document.getElementById("d_tur").value;
    var fecha_a =  document.getElementById("fet").value+':00';  


    document.getElementById("Resultado").innerHTML=''
    var URL = "https://webapi20211215215815.azurewebsites.net/api/viaje?origen="+destino_a+"&destino="+destino_b+"&fecha_salida="+fecha_a
     
    fetch(URL)
        .then(response => response.json())  
        // .then(data =>console.log(data)) 
        .then( data => {
             
            let almacenar2 = data.length;
            let almacenar=data;
            
            for (var item=0;item<almacenar2;item++){

                // console.log(almacenar[item].codigo)
                // document.getElementById("Resultado").innerHTML+=almacenar[item].codigo+'<br>'
                

                a_libres=almacenar[item].asientos_libres
                a_libres= a_libres.replaceAll(',', '')
                
                var enviar_asientos = almacenar[item].asientos_libres.replaceAll(',', '/')

                // console.log(a_libres.length/2) 
                document.getElementById("Resultado").innerHTML+=
                '<div class="super1 border border-primary border-top-0 border-4 m-2 rounded-pill text-center ">'+
                    '<div class="super2 row">'+
                        '<div class="col-6">'+
                           '<b>'+ almacenar[item].origen+'---->'+ almacenar[item].destino+'</b>'+
                        '</div>'+
                        '<div class="col-6">Desde S/.'+
                            almacenar[item].costo_piso2+
                        '</div>'+
                    '</div>'+

                    '<div class="super2 row d-flex">'+
                        '<div class="col-4"> Salida '+
                            almacenar[item].fecha_salida+
                        '</div>'+
                        '<div class="col-4">Llegada '+
                            almacenar[item].fecha_llegada+
                        '</div>'+
                        '<div class="col-4">'+
                            '<button  onclick=Comprar("'+almacenar[item].codigo+'","'+enviar_asientos+'") class="btn btn-primary" >Comprar</button>'+
                        '</div>'+
                    '</div>'+
    
                    '<div class="super2 row">'+
                        '<div class="col-6"> <b>Asientos Libres:  '+
                            a_libres.length*0.5+
                        '</b></div>'+
                    '<div class="col-6">Conductor -  '+
                            almacenar[item].conductor+
                        '</div>'+
                    '</div>'+

                '</div>'

            }
        } )  
} 
 
// mostrar el monto a pagar de los asientos
function monto_pagar(a,cc){
    
    if(cc==0){
        total =total + a 
        // console.log(total)
        document.getElementById("Total_a_pagar").innerHTML='<div class="fs-3">El total a pagar es S/ ' + total +'</div> '+
        '<div><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="B_pagar">Pagar</button></div>'

    }
    else if(cc==1){
        total =total - a 
        // console.log(total)
        document.getElementById("Total_a_pagar").innerHTML='<div class="fs-3">El total a pagar es S/ ' + total +'</div> '+ '<div><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="B_pagar">Pagar</button></div>'

    }
}
 

//seleccionar los asientos y cambiar de color
function Comprar(id_compra,asiento_libr){
    localStorage.setItem("usr_id_viaje", id_compra );
    document.getElementById("ocultar").className += " d-flex justify-content-center";
    document.getElementById("ocultar").innerHTML = '' 
    var  element2=document.getElementById("ocultar")
    var url2="./páginas/appAsientos.html";

fetch(url2)
    .then(function (response) {
        return response.text();
    })
    .then(function (html) {
        //  console.log(html);
        document.getElementById("ocultar").innerHTML = html;
        var acumulado = document.getElementsByClassName("element-bus").length;
        for (i = 0; i < acumulado; i++) {
            var grisar = document.getElementsByClassName("element-bus")[i].id
            if (!asiento_libr.includes(grisar)) {
                document.getElementsByClassName("element-bus")[i].childNodes[9].style.backgroundColor = "gray";
                document.getElementsByClassName("element-bus")[i].childNodes[9].style.color = "black";
            }
            else {
                document.getElementsByClassName("element-bus")[i].addEventListener("click", function captura_click(e) {
                    var HaHechoClick;
                    HaHechoClick = e.target;
                    var incluir = HaHechoClick.parentNode.id
                    if (HaHechoClick.nodeName == 'BUTTON') { 

                        // quitar asiento
                        if (HaHechoClick.style.backgroundColor ==  "royalblue") {
                            HaHechoClick.style.color = "black";
                            HaHechoClick.style.backgroundColor = "white";
                            tf = HaHechoClick.textContent 
                            var quitar = asientos_seleccionados.indexOf(incluir)
                            asientos_seleccionados.splice(quitar, 1);
                            console.log(asientos_seleccionados)
                            tf=tf.replace('S/','')
                            tf=tf.replaceAll(' ','')
                            tf=parseInt(tf) 
                            monto_pagar(tf,1)
                            
                        }
                        else {
                             //aumentar asientos
                            asientos_seleccionados.push(incluir)
                            console.log(asientos_seleccionados)
                            tf = HaHechoClick.textContent
                            tf=tf.replace('S/','')
                            tf=tf.replaceAll(' ','') 
                            HaHechoClick.style.color = "white";
                            HaHechoClick.style.backgroundColor = "royalblue";
                            tf=parseInt(tf) 
                            monto_pagar(tf,0)
                           
                        }
                    }
                })
            }
        }
    });
}
 