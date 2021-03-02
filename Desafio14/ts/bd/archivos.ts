import * as fs from 'fs';
import * as path from 'path';


export interface IChat{  
    //Propiedades 
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
      const data = await fs.promises.readFile(path.resolve(__dirname, this.FileName), { encoding: 'utf8' })
      let arrayMsj:[] = JSON.parse(data);
      let ChatMsg:IChat[] = arrayMsj.map((val: any) => <IChat>{
        mail: val.mail,
        time: val.time,
        message: val.message
      });
      return ChatMsg;
      
    } catch (error) {
      console.log('Error Obteniendo datos de .txt')
      return [];
    }
  }
  
  addMessage = async (nuevoMsg: IChat) => {
      try {         

        this.ChatMessages.push(nuevoMsg);
        
        const data = await fs.promises.writeFile(path.resolve(__dirname, this.FileName), JSON.stringify(this.ChatMessages))
        console.log("Archivo Guardado")
      } catch (error) {
        console.error("No se pudo Guardar el archivo")
        console.log(error)
      }
    }
  
}