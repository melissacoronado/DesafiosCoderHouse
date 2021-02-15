import express, {Application, Request, Response} from 'express'
import { RouterProductos } from './rutas/rutasProductos';

const app:Application = express()


let puerto = process.env.port || 8080;
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', RouterProductos);
app.use('/api', express.static(__dirname + '/public'));

app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080') 
}).on("error", (err: any)=>{ //evento on error  -- node esta orientado a eventos
    console.log("===========================")
    console.log(err.code)
})