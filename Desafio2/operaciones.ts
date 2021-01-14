export class Operaciones{
    private num1: number;
    private num2: number;
    //private resultado: number;

    constructor(n1: number, n2: number, opera: string){
        this.num1 = n1;
        this.num2 = n2;        
    }

    public resultado(n1: number, n2: number, opera: string, callback){
        callback(n1, n2, opera);
    }
}