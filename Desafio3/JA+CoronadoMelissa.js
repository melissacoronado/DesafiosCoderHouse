let Finalizar = (intInterval) =>{
    clearInterval(intInterval);
    console.log("Proceso Completo!");
}
//https://www.programiz.com/javascript/async-await
//https://stackoverflow.com/questions/32445323/jquery-replace-text-every-2-seconds-with-words-from-an-array
const ImprimirTexto = async (Arraypalabra, interval, funcCallback) =>{
    let i=0;
    let intervalID = setInterval(()=>{    
        i++;  
        
            (!(i < Arraypalabra.length)) && funcCallback(intervalID);
            console.log(i); 
            console.log(`Palabra: ${Arraypalabra[i % Arraypalabra.length]}`);  
            
    },interval)

}

let TextFunc = async (palabra, interval, funcCallback)=>{
    interval = typeof(Interval) == "undefined" ? 1000 : Interval;    
    let Arraypalabra = palabra.split(' ');
    //await new Promise(resolve => setInterval(() => resolve(ImprimirTexto(Arraypalabra, interval, funcCallback)), interval));

    try{
        let word = await ImprimirTexto(Arraypalabra, interval, funcCallback);
        console.log(100);
    }catch(err){
        console.log(err);
    }
    
    //let i = 0;
    /*var i= i || 0;
    let intervalID;

    if(i >= Arraypalabra.length){
        funcCallback(intervalID);        
    } else {
        console.log(Arraypalabra[i]);
        intervalID = setTimeout(TextFunc, interval, palabra, interval, ++i, funcCallback);
    }*/

    /*
    let intervalID = setInterval(()=>{         
        (!(i < Arraypalabra.length)) && funcCallback(intervalID);
        console.log(`Palabra ${Arraypalabra[i % Arraypalabra.length]}`);  
        i++;        
    },interval)
    */
}

 TextFunc("Hola Mundo 2021", null, Finalizar);
 //TextFunc("Esta es otra prueba", null, Finalizar);