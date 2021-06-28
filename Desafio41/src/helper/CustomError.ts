class CustomError {
    estado: number;
    descripcion: string;
    detalles: string;

    constructor (estado:number, descripcion:string, detalles:string) {
        this.estado = estado
        this.descripcion = descripcion
        this.detalles = detalles
    }
}

export default CustomError