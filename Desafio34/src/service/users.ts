import { usuariosModel } from '../models/usuarios'

interface IUsuario{      
    //Metodos
    addUser(nombre:string, email:string): void;
    getUser(nombre:string, email:string): void;
}

export class Usuario implements  IUsuario{
    
    
    addUser = async (nombre:string, email:string) => {
        try{
            
            const Usr = new usuariosModel({nombre, email});
            await Usr.save()
            .then(() => console.log("Usuario Guardado"))
            .catch( (err: any) => console.log(err));

        }catch(error){            
            console.error(error)
            throw error
        }
    }

    getUser = async (nombreUsr:string, emailUsr:string) => {
        try{
            let User ="";
            await usuariosModel.find({nombre: nombreUsr, email: emailUsr})
                    .then( (usuario: any) => {
                      console.log(usuario);
                      User = usuario;
                    })
                    .catch( (error: any) => console.log(error));
                         
            return User; 
        }catch(error){
            throw error
        }
    }
}