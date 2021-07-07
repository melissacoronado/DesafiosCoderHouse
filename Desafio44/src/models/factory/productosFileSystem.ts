import fs from 'fs'

export interface IProd{  
    //Propiedades
    id?: number  
    title:string
    price:number
    thumbnail:string
}

export default class persistenciaFileSystem {
    constructor() {
        ;( async () => {
            try {
                await fs.promises.readFile('productos.txt')
            }
            catch {
                await fs.promises.writeFile('productos.txt', JSON.stringify([]))
            }
        })()
    }
    obtenerProductos = async () => {
        try {
            let datos = await fs.promises.readFile('productos.txt')
            return JSON.parse(datos.toString())
        }
        catch(error) {
            console.log(error)
        }
    }
    agregarProductos = async (producto: IProd) => {
        try {
            let productos = JSON.parse(await fs.promises.readFile('productos.txt').toString())
            productos.push(producto)
            await fs.promises.writeFile('productos.txt', JSON.stringify(productos))
        }
        catch(error) {
            console.log(error)
        }
    }
}