import Sumar from './suma';
import Restar from './resta';


let operacion = async (num1: number, num2: number, operacion: string) =>{
    
    switch (operacion.toLowerCase()){
        case "suma": { 
            let opSuma = await import('./suma');
            let sum = opSuma.default;
            let sumando = new Sumar(num1, num2);
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(sumando.resultado());
            });
        }
        case "resta": {  
            let opResta = await import('./resta');
            let rest_ = opResta.default;
            let restando = new Restar(num1, num2)
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(restando.resultado());
            });
        }        
    }

}

export default operacion;