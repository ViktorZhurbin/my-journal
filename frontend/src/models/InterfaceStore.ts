import { ITodo } from './InterfaceTodo';

export interface IStore {
    todos: ITodo[] | null;
}
