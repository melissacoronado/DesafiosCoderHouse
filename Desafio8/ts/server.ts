import express, {Application, Request, Response} from 'express'
import { Producto, Operaciones } from './bd'

let puerto = process.env.port || 8080;

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//let productos:Producto[] 
let opsProd = new Operaciones("Prueba", 0, "MiPrueba")


app.get('/', (req: Request, res: Response) => {   
    res.send(opsProd.showProducts())
})

app.get('/add', (req: Request, res: Response) => {   
    let newProduct:Producto = {
        title: "Nuevo Prod",
        price: 100,
        thumbnail: "thum/ruta/algo/test.png"
    }
    res.send(opsProd.addProduct(newProduct))
})

app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
   
})