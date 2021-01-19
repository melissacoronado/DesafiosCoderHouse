let Finalizar = (intInterval, cantPalabras) =>{
    clearInterval(intInterval);
    console.log("Proceso Completo! " + cantPalabras + " palabras.");
    //console.log("Palabras: " + cantPalabras);
}


let TextFunc = async (palabra, interval, funcCallback)=>{
    
    let Arraypalabra = palabra.split(' ');
   
      return await new Promise(resolve => {
        let i=0;
        let intervalSeg = (typeof(interval) == "undefined" || interval == null) ? 1000 : interval;   
        console.log(intervalSeg);

        const intervalo = setInterval(() => {
          if (!(i < Arraypalabra.length)) {
            resolve(funcCallback(intervalo, Arraypalabra.length));
            clearInterval(intervalo);
          }else{
            console.log(Arraypalabra[i % Arraypalabra.length]);  
          };
          i++;  
        }, intervalSeg);
      });
}

 TextFunc("Hola Mundo 2021", 2000, Finalizar);
 TextFunc("Esta es otra prueba", null, Finalizar);
