import { Request, Response} from 'express'
import { logger, loggerError, loggerWarn } from "../helper/logger";
import { opcDao } from '../server';
import ProductosDbDao from '../DAO/productos.BD.DAO';
import ProductosFileDao from '../DAO/productos.File.DAO';
import { IProd, Producto } from '../DAO/productos.DAO';

let opsProd = new Producto();
if(opcDao[2] == "two"){
    let opsProd = new ProductosDbDao()
}else{
    let opsProd = new ProductosFileDao()
}

//let opsProd = new Producto();

export const getProductos = async (req: Request, res: Response, next: any) => {

    try {
        if(opcDao[2] == "two"){
            let opsProd = new ProductosDbDao()
        }else{
            let opsProd = new ProductosFileDao()
        }

        const products =  await opsProd.showProducts();
        if (products.length == null){
            loggerWarn.warn("No hay productos cargados.");
            res.status(404).json({error : 'No hay productos cargados.'})
            next();
        }else{
            logger.info("Obtener productos Ok");
            res.status(200).send(products)
            next();
        }      
    } catch(error) {
        loggerError.error(error.message)
      res.sendStatus(500) && next(error)
    }
}

export const getProductosById = async (req: Request, res: Response, next: any) => {
    const id: string = req.params.id;
    try {
        const product =  await opsProd.showProductById(id);
        //if (product.length == 0){
        if (product == null){
            loggerWarn.warn("No se encontro producto buscado.");
            res.status(404).json({error : 'No se encontro producto buscado.'})
            next();
        }else{
            logger.info(`Obtener producto ${id} Ok`);
            res.status(200).send(product)
            next();
        }      
    } catch(error) {
        loggerError.error(error.message)
        res.sendStatus(404).json({error : 'No se encontro producto buscado.'}) && next(error)
    }
}

export const postProductos = async (req: Request, res: Response, next: any) => {
    try {
        const { timestamp, nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const newProduct = { timestamp, nombre, descripcion, codigo, foto, precio, stock }

        await opsProd.addProduct(newProduct)       
        logger.info('Producto almacenado con exito');
        res.status(200).json('Producto almacenado con exito') 
    } catch(error) {
        loggerError.error(error.message)
        res.status(404).json({error : 'No se pudo agregar el Producto.'}) && next(error)
        //res.sendStatus(500) && next(error)
    }
}

export const patchProductos = async (req: Request, res: Response, next: any) => {
    try {
        const id: any = req.params.id
        
        const productUpdate =  await opsProd.showProductById(id);   
		if (productUpdate === null){
            loggerError.error(`Producto no encontrado ${id}`)
			res.status(404).json({error : 'Producto no encontrado'})
            next();
        }

        const { nombre, descripcion, codigo, foto, precio, stock } = req.body  
        await opsProd.updateProducts(id, nombre, descripcion, codigo, foto, precio, stock)
        logger.info('Producto Modificado!');
        res.status(200).json({Respuesta: "Producto Modificado!"}) 
        next();    
    } catch(error) {
        loggerError.error(error.message)
        res.status(404).json({error : 'Producto no encontrado.'}) && next(error)
        //res.sendStatus(500) && next(error)
    }
}

export const deleteProductos = async (req: Request, res: Response, next: any) => {
    try {
        const id: any = req.params.id;
        
        const productDelete =  await opsProd.showProductById(id);   
		if (productDelete === null){
            loggerError.error(`Producto no encontrado ${id}`)
			res.status(404).json({error : 'Producto no encontrado'})
            next();
        }

        await opsProd.deleteProduct(id);
        logger.info('Producto Eliminado!');
        res.status(200).send('Producto Eliminado.') 
           
    } catch(error) {
        loggerError.error(error.message)
        res.status(404).json({error : 'Producto no encontrado.'}) && next(error)
        //res.sendStatus(500) && next(error)
    }
}

