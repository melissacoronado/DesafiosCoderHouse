import express, {Application, Request, Response} from 'express'
//import * as fs from "fs"
import path from 'path'
import { RouterProductos } from './rutas/rutasProductos';
const pug = require('pug');

const app:Application = express()
/*const cors = require('cors')
app.use(cors());*/

let puerto = process.env.port || 8080;
app.use('/api', express.static(__dirname + '/public')); //Al principio
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', RouterProductos);





app.set('views', path.resolve(__dirname + '/public/views/')); 
app.set('view engine', 'pug');



app.listen(puerto, ()=> {
    console.log('Servidor escuchando en puerto 8080')
     
}).on("error", (err: any)=>{
    console.log(err)
})