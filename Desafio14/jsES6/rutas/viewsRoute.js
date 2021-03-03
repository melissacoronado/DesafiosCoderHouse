const express = require('express')
//const opsProd = require('../server')
//const opsChat = require('../server')
const Producto = require('../bd/bd')
const ChatMsg = require('../bd/archivos')

let opsProd = new Producto();
let opsChat = new ChatMsg("chatBD.txt");

(async () => { 
    opsChat.ChatMessagess = await opsChat.getMessages()            
})()

var router = express.Router()

router.get('/productos/vista', (req, res) => {  
    try{    
        //console.log(HistoryMensajesChat)
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos, ListaMsjChat: opsChat.ChatMessagess});
    }catch(error){
        res.status(404).json({error : 'Error mostrando listado de Productos.'})
        console.log(error)
    }
})

router.post('/productos', (req, res) => {  
    try{    
        console.log('post productos');
        const { title, price, thumbnail } = req.body  
        
        //Falta validar que vengan todos los parametros              
        const newProduct = { title, price, thumbnail }

        opsProd.addProduct(newProduct)       
        //res.render('partials/addProducts', {layout : 'index'});
        res.render('partials/main', {layout : 'index', ListaProductos: opsProd.productos});
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

const RouterViewsProductos = router;
module.exports = RouterViewsProductos