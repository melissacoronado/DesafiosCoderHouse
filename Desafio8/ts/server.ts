import express, {Application, Request, Response} from 'express'

let puerto = process.env.port || 8080;

const app:Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

interface Producto{    
    title:string
    price:number
    thumbnail:string
}

let productos:Producto[] = [];




app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
   
})