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
let getItems = 0;
let getItemsRandom = 0;


(async () => { 

    let BDproductos:[]  = await leerDB("productos.txt")

    productos = BDproductos.map((val: any) => <Producto>{
        id: val.id,
        title: val.title,
        price: val.price
      });
})()

app.get('/', (req: Request, res: Response) => {   
    res.send('Hola Visitante!')
})

app.get('/items', (req: Request, res: Response) => {   
    getItems++;

    res.json({ 
        items: productos, 
        cantidad: productos.length 
    });
})


app.get('/item-random', (req: Request, res: Response) => {   
    getItemsRandom++; 
    const randomElement = productos[Math.floor(Math.random() * productos.length)];
    res.json({ 
        item: randomElement 
    });
})


app.get('/visitas', (req: Request, res: Response) => {    

    res.json({ 
        visitas : { 
            items: getItems, 
            item: getItemsRandom } 
    });
})


app.listen(8080, ()=> {

    console.log('Servidor escuchando en puerto 8080')

})