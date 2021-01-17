<<<<<<< HEAD
const operacion = async (num1: number, num2: number, operacion: string) =>{
    
    switch (operacion.toLowerCase()){
        case "suma": { 
            let opSuma = await import('./sumar');
            let sumando = new opSuma.Sumar(num1, num2);
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(sumando.resultado());
            });
        }
        case "resta": {  
            let opResta = await import('./restar');
            let restando = new opResta.Restar(num1, num2);
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(restando.resultado());
            });
        }        
    }
}

=======
const operacion = async (num1: number, num2: number, operacion: string) =>{
    
    switch (operacion.toLowerCase()){
        case "suma": { 
            let opSuma = await import('./sumar');
            let sumando = new opSuma.Sumar(num1, num2);
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(sumando.resultado());
            });
        }
        case "resta": {  
            let opResta = await import('./restar');
            let restando = new opResta.Restar(num1, num2);
            return new Promise((resolutionFunc,rejectionFunc) => {
                resolutionFunc(restando.resultado());
            });
        }        
    }
}

>>>>>>> 6f5f9df97a1a1aad3641cd612cec2572d08a443a
export default operacion;