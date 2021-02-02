import express, {Application, Request, Response} from 'express'
import leerDB from './db'

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

interface Producto{
    id:number
    title:string
    price:number
}

let productos:Producto[] = [];

(async () => { debugger;
    //Aqui quiero leer el txt que esta en db.ts que lo devolvi como un array.
    let BDproductos:[]  = await leerDB("productos.txt")
    //o no se si seria let BDproductos:[]  = await leerDB("productos.txt")

    //luego aqui queria era pasar el array al tipo Producto[] 
    productos = BDproductos.map((val: any) => <Producto>{
        id: val.id,
        title: val.title,
        price: val.price
      });
})()


//En este get queria mostrar el listado de productos que lei arriba en await leerDB
app.get('/', (req: Request, res: Response) => {
    res.json(productos)
})

//este solo muestra la palabra get http://localhost:8080/items
app.get('/items', (req: Request, res: Response) => {
    res.send('Get');
})

app.listen(8080, ()=> {

    console.log('Servidor escuchando en puerto 8080')

})