export interface IWrite<T>{
    saveMsg(msg: T): Promise<Boolean>;
}