import { IStore } from '~/models/InterfaceStore';
import { ITodo } from '~/models';

const mockedTodos: ITodo[] = [
    {
        id: 'a',
        task: 'First todo',
        isComplete: false,
    },
    {
        id: 'b',
        task: 'Еще одно',
        isComplete: false,
    },
    {
        id: 'c',
        task: 'Это готово',
        isComplete: true,
    },
    {
        id: 'd',
        task: 'Это ещё нет',
        isComplete: false,
    },
];

export const initialState: IStore = {
    todos: mockedTodos,
};
