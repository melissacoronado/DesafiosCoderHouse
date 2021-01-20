/*let Finalizar = (intInterval, cantPalabras) =>{
    //clearInterval(intInterval);
    console.log("Proceso Completo! " + cantPalabras + " palabras.");
}*/


let TextFunc = (palabra, interval=1000, callback)=>{
    let i=0;
    let Arraypalabra = palabra.split(' ');
    const intervalo = setInterval((ListaPalabras) => {
        if (!(i < ListaPalabras.length)) {
          clearInterval(intervalo);
          callback(ListaPalabras.length);
        }else{
          console.log(ListaPalabras[i]);  
          i++;
        };
          
      }, interval, Arraypalabra);
        
}
TextFunc("Hola Mundo 2021", 500, ( (cantP1) => {
    let TotalPalabras = cantP1;
    TextFunc("Esta es otra prueba", 500, ( (cantP2) => {
        TotalPalabras += cantP2;
        console.log(`Total Palabras: ${TotalPalabras}`);
    }))
}));

 
