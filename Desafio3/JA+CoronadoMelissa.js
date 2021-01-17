let Finalizar = (intInterval) =>{
    clearInterval(intInterval);
    console.log("Proceso Completo!");
}

let TextFunc = (palabra, interval, funcCallback)=>{//
    interval = typeof(Interval) == "undefined" ? 1000 : Interval;
    
    let Arraypalabra = palabra.split(' ');
    let i=0;
    
    let intervalID = setInterval(()=>{  
        (!(i < Arraypalabra.length)) && funcCallback(intervalID);
        console.log(Arraypalabra[i++]);  
        /*if(!(i<Arraypalabra.length)){
            console.log(Arraypalabra[i++]);  
        }else{
            funcCallback(intervalID);
        }*/
        /*if(i<Arraypalabra.length){
            funcCallback(intInterval);
        }else{

        }
        for(var i; i<Arraypalabra.length; i++){
            console.log(Arraypalabra[i]);
        }*/
    },interval)
}

TextFunc("Hola Mundo", null, Finalizar);