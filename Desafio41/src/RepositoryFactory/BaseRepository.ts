import { IRead } from "./IRead";
import { IWrite } from "./IWrite";
import { ChatMsg, IChat } from "../service/mensajes";

let opsChat = new ChatMsg();

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T>{
    async saveMsg(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async findMsg(): Promise<T[]> {
        let ChatMsg:IChat[] = await opsChat.getMessages();
        return ChatMsg;
    }
    
}