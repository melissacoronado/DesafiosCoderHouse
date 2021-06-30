import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import {mensajesModel} from '../models/mensajes'


export interface IChat{  
    //Propiedades 
    id?: number 
    mail:string
    time:string
    message:string
}

interface IChatMsg{  
    //Propiedades
    //FileName: string
    ChatMessages:IChat[]
    //Metodos
    addMessage(msg: IChat): void;
    getMessages(): void;
}

export class ChatMsg implements  IChatMsg{
  ChatMessages:IChat[] = []
  
  getMessages = async () => {
    try {  
      let ChatMsg:IChat[] = [];

      await mensajesModel.find({})
                    .then( (mensajes: any) => {
                      if(mensajes.length > 0){
                        ChatMsg = mensajes.map((val: any) => <IChat>{
                          mail: val.mail,
                          time: (new Date(val.time).toLocaleString()),
                          message: val.message
                        });
                      } 
                    })
                    .catch( (error: any) => console.log(error));      
      return ChatMsg;      
    } catch (error) {
      console.log('Error Obteniendo datos de la BD.')
      console.error(error)
      return [];
    }
  }
  
  addMessage = async (nuevoMsg: IChat) => {
      try {  
        console.log(nuevoMsg)
         const Msg = new mensajesModel(nuevoMsg)
         await Msg.save()
        .then(() => console.log("Mensaje Guardado"))
        .catch( (err: any) => console.log(err));
        
      } catch (error) {
        console.error("No se pudo Guardar el Mensaje")
        //console.log(error)
      }
    }
  
}