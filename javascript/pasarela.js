// Leemos que se esta escribiendo - letra o numeros
function valideKey(evt){
    var origen= (evt.target.id) 
    var code = (evt.which) ? evt.which : evt.keyCode;
    if(code==8) { // backspace.
      return true;
    } else if(code>=48 && code<=57 && origen=="ntarjeta_ingresado"||code>=48 && code<=57 && origen=="ccvv_ingresado") { // es numero.
      Modificar_tarjeta(origen,evt.key);
    } 
    else if(code>=65 && code<=90||code>=97 && code<=122&&origen=="ntitular_ingresado"||code==32&&origen=="ntitular_ingresado") { // es numero.
       if(origen=="ntitular_ingresado"){ 
        if(code==32){evt.key=="-"}
        Modificar_tarjeta(origen,evt.key);
       }
    }
    else{ // other keys.
      return false;
    } 
} 
// modificamos los datos de la tarjeta
function Modificar_tarjeta(a,b) {
    
    var tmp_ntitular= document.getElementById("value_ntitular").innerText
    var tmp_tarjeta=document.getElementById("value_ntarjeta").innerText
    var tmp_ccvv=document.getElementById("value_ccvv").innerText
 

    if(a=="ntitular_ingresado"){
        if(tmp_ntitular=="Pedro Suarez"){
            document.getElementById("value_ntitular").innerText='' 
        }
        if(tmp_ntitular.length<15){
        document.getElementById("value_ntitular").innerText += b
        }
    }
    else if(a=="ccvv_ingresado"){
        if(tmp_ccvv=="0000"){
            document.getElementById("value_ccvv").innerText='' 
            document.getElementById("value_ccvv").innerText += b
        }
        else if(tmp_ccvv.length<4){ 
        document.getElementById("value_ccvv").innerText += b
        }
    }
    else if(a=="ntarjeta_ingresado"){
        var tm=0
        if(tmp_tarjeta.length<20){
            
                if(tmp_tarjeta=="1234 1234 1234 1234"){
                    document.getElementById("value_ntarjeta").innerText=''
                    document.getElementById("value_ntarjeta").innerText += b
                }
                else{
                    tm=tmp_tarjeta.length 
                    if(tm=4){
                    document.getElementById("value_ntarjeta").innerText += ''
                    document.getElementById("value_ntarjeta").innerText += b
                                                }
                    else{
                        document.getElementById("value_ntarjeta").innerText += b
                    }}
        }
    }
} 
// Voltear tarjeta
function hover(){
    document.getElementById("tarjeta2").style.transform="rotatey(-180deg)"; 
}
// voltear tarjeta
function deshover(){
    document.getElementById("tarjeta2").style.transform="rotatey(0deg)";  
}

function renommbrar_fecha(){
    document.getElementById("value_fvencimiento").innerText=document.getElementById("f_vencimiento").value 
}
  
function Limpiar(){
    document.getElementById("value_ntitular").innerText ="Pedro Suarez"
    document.getElementById("value_ntarjeta").innerText = "1234 1234 1234 1234"
    document.getElementById("value_ccvv").innerText ="0000"
    document.getElementById("value_fvencimiento").innerText="2011-03" 

}


