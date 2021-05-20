import express, {Application, Request, Response} from 'express'
import { Usuario } from '../service/users';

var router = express.Router();
let usrs = new Usuario()

router.post('/crear', async (req: Request, res: Response) => {  
    try{    
        console.log('post productos');
        const { nombre, email } = req.body  
        await usrs.addUser(nombre, email);
        
    }catch(error){
        res.status(404).json({error : 'No se pudo agregar el Producto.'})
        console.log(error)
    }
})

export const AuthUsers: express.Router = router;