export interface IRead<T>{
    findMsg(): Promise<T[]>;
}