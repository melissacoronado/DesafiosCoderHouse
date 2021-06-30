export interface IWrite<T>{
    saveMsg(): Promise<T[]>;
}