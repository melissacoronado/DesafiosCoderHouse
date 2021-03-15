import fs from 'fs';
import path from 'path';
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./mensajes.db.sqlite"
  },
  useNullAsDefault: false
})


export interface IChat{  
    //Propiedades 
    id?: number 
    mail:string
    time:string
    message:string
}

interface IChatMsg{  
    //Propiedades
    FileName: string
    ChatMessages:IChat[]
    //Metodos
    addMessage(msg: IChat): void;
    getMessages(): void;
}

export class ChatMsg implements  IChatMsg{
  ChatMessages:IChat[] = []
  FileName: string = ""
  constructor(nombreArchivo: string){
        this.FileName = nombreArchivo;
  }
  
  getMessages = async () => {
    try {  
      let ChatMsg:IChat[] = [];

      const data = await knex.select('*')
                             .from('mensajes')
                             .then((rows: any) => {
                               console.log(rows.length)
                                if(rows.length > 0){
                                    ChatMsg = rows.map((val: any) => <IChat>{
                                      mail: val.mail,
                                      time: val.created_at,
                                      message: val.message
                                    });
                                }                
                             })
                             .catch((error: any) => console.log(error));
      //console.log(ChatMsg);
      /*const data = await fs.promises.readFile(path.resolve(__dirname, this.FileName), { encoding: 'utf8' })
      let arrayMsj:[] = JSON.parse(data);
      let ChatMsg:IChat[] = arrayMsj.map((val: any) => <IChat>{
        mail: val.mail,
        time: val.time,
        message: val.message
      });*/
      return ChatMsg;
      
    } catch (error) {
      console.log('Error Obteniendo datos de .txt')
      console.error(error)
      return [];
    }
  }
  
  addMessage = async (nuevoMsg: IChat) => {
      try {         

        await knex('mensajes')
              .insert({ mail: nuevoMsg.mail,
                        created_at: nuevoMsg.time,
                        message: nuevoMsg.message })
/*
        this.ChatMessages.push(nuevoMsg);
        
        const data = await fs.promises.writeFile(path.resolve(__dirname, this.FileName), JSON.stringify(this.ChatMessages))
        */
       console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se pudo Guardar el archivo")
        console.log(error)
      }
    }
  
}