import { IStore } from '~/models/InterfaceStore';
import { ITodo } from '~/models';

const mockedTodos: ITodo[] = [
    {
        id: 'a',
        task: 'Главное дело на день',
        isDone: false,
    },
    // {
    //     id: 'b',
    //     task: 'Learn Firebase',
    //     isDone: false,
    // },
    // {
    //     id: 'c',
    //     task: 'Learn DOM',
    //     isDone: true,
    // },
    // {
    //     id: 'd',
    //     task: 'Learn CSS',
    //     isDone: false,
    // },
];

export const initialState: IStore = {
    todos: mockedTodos,
};
