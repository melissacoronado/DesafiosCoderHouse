export class Restar{
    private num1: number;
    private num2: number;

    constructor(n1: number, n2: number){
        this.num1 = n1;
        this.num2 = n2;        
    }

    public resultado() {
        return this.num1 - this.num2;
    }
}