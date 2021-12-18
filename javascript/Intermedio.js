

// Lo que aparecera en cada transcicion de carga de pagina
function intermedio(){
 
    document.getElementById("cargas").style.display=""  
   document.getElementById("Todo").style.visibility="hidden"
    let y= "./páginas/Imagencarga.html"
    fetch(y)
    .then( (response)=>  response.text())
    .then(html =>{
        document.getElementById("cargas").innerHTML=html         
    })   
    
  function intermedio2() {
        sleep(1000).then(() => {
            document.getElementById("inter").innerHTML += '<div class="spinner-grow text-primary mx-2" role="status"><span class="visually-hidden">Loading...</span></div>'
        });
        sleep(200).then(() => {
            document.getElementById("inter").innerHTML += '<div class="spinner-grow text-primary mx-2" role="status"><span class="visually-hidden">Loading...</span></div>'
        }); 
        sleep(300).then(() => {
            document.getElementById("inter").innerHTML += '<div class="spinner-grow text-primary mx-2" role="status"><span class="visually-hidden">Loading...</span></div>'
        });
        sleep(3400).then(() => {
            document.getElementById("inter").innerHTML += '<div class="spinner-grow text-primary mx-2" role="status"><span class="visually-hidden">Loading...</span></div>'
        }); 
        
  } 
 
  intermedio2();

      sleep(3500).then(() => { 
        document.getElementById("cargas").innerHTML=''
        document.getElementById("Todo").style.visibility="visible"
        document.getElementById("cargas").style.display="hidden"
      });

} 
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }