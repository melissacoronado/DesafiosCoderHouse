import operacionMatematica from './TS+CoronadoMelissa'


let operaciones = () =>{

    operacionMatematica(4,5,'suma').then((retorno) => console.log(`El resultado de la Suma es: ${retorno}`));
    operacionMatematica(4,5,'resta').then((retorno) => console.log(`El resultado de la Resta es: ${retorno}`));
}

operaciones();