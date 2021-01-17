import operacion from './TS+CoronadoMelissa'

let operaciones = () =>{

    operacion(4,5,'suma').then((retorno) => console.log(`El resultado de la Suma es: ${retorno}`));
    operacion(8,5,'suma').then((retorno) => console.log(`El resultado de la Suma es: ${retorno}`));
    
    operacion(8,5,'resta').then((retorno) => console.log(`El resultado de la Resta es: ${retorno}`));    
    operacion(6,4,'resta').then((retorno) => console.log(`El resultado de la Resta es: ${retorno}`));
}

operaciones();