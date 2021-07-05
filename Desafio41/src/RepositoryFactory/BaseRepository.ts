import { IRead } from "./IRead";
import { IWrite } from "./IWrite";
import { ChatMsg, IChat } from "../service/mensajes";
import {mensajesModel} from '../models/mensajes';


export abstract class BaseRepository<T> implements IRead<T>, IWrite<T>{
    async saveMsg(newMsg: T): Promise<Boolean> {
        const Msg = new mensajesModel(newMsg);         
        const inserted = await Msg.save();
        return inserted;
    }

    async findMsg(): Promise<T[]> {
        const chatMsgFound: T[] = await mensajesModel.find({}).toArray();
        return chatMsgFound;
    }
    
}