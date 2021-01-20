/*let Finalizar = (intInterval, cantPalabras) =>{
    //clearInterval(intInterval);
    console.log("Proceso Completo! " + cantPalabras + " palabras.");
}*/


let TextFunc = (palabra, interval, callback)=>{
  let i=0;
  let intervalSeg = interval ||  1000;   
  let Arraypalabra = palabra.split(' ');

    const intervalo = setInterval(() => {
        if (!(i < Arraypalabra.length)) {
          clearInterval(intervalo);
          console.log(`${Arraypalabra.length}  palabras.`);
          callback(Arraypalabra.length);
        }else{
          console.log(Arraypalabra[i]);            
        };
        i++;
      }, intervalSeg);
        
}


TextFunc("Hola Mundo 2021", 500, ( (cantP1) => {
    let TotalPalabras = cantP1;
    TextFunc("Esta es otra prueba", 700, ( (cantP2) => {
        TotalPalabras += cantP2;
        TextFunc("Una Nueva Palabra", null, ( (cantP3) => {
          TotalPalabras += cantP3;
          console.log(`Proceso Completo!. Total Palabras: ${TotalPalabras}`);
        }))
    }))
}));

 
