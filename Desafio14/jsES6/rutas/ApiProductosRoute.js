const express = require('express')
//const opsProd = require('../server')
const Producto = require('../bd/bd')
var router = express.Router()
let opsProd = new Producto()

router.get('/', (req, res) => {  
    try{        
        const products =  opsProd.showProducts()
        if (products.length == 0){
            res.status(404).json({error : 'No hay productos cargados.'})
        }else{
            res.status(200).send(products)
        }
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el listado de Productos.'})
    }
})


router.get('/:id', (req, res) => {  
    try{
        const id = +req.params.id //Viene de la url/1 y el + para parsear a numero
        const product =  opsProd.productos.find(x => x.id === id)

        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

        if (product === null)
            res.status(404).json({error : 'Producto no encontrado'})

        res.status(200).send(product)
    }catch(error){
        res.status(404).json({error : 'No se pudo obtener el Producto solicitado.'})
    }
})

router.patch('/actualizar/:id', (req, res) => { 
    try{    
        const id = +req.params.id //Viene de la url/1 y el + para parsear a numero
        
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

        const productSelecc =  opsProd.productos.find(x => x.id === id)        
		if (productSelecc === null)
			res.status(404).json({error : 'Producto no encontrado'})
        
        const { title, price, thumbnail } = req.body  
        opsProd.updateProducts(id, title, price, thumbnail)
        
        res.status(200).json({Respuesta: "Producto Modificado!"})        
    }catch(error){
        res.status(404).json({error : 'No se pudo modificar el Producto.'})
    }
})

router.delete('/borrar/:id', (req, res) => {  
    try{    
        const id = +req.params.id 
        if (opsProd.productos.length == 0)
            res.status(404).json({error : 'No hay productos cargados'})

		const product =  opsProd.productos.find(x => x.id === id)		
		if (product === null)
			res.status(404).json({error : 'Producto no encontrado'})
		
        opsProd.deleteProduct(id)
        res.status(200).send('Producto Eliminado.')   
    }catch(error){
        res.status(404).json({error : 'No se pudo eliminar el Producto.'})
    }
})



const RouterApiProductos = router;
module.exports = RouterApiProductos
