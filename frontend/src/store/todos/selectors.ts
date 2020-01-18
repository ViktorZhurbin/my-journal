import { IStore } from '~/models';

export const selectTodos = ({ todos }: IStore) => todos;

export const selectCompleteTodos = ({ todos }: IStore) =>
    todos?.filter(todo => todo.isComplete) ?? [];

export const selectActiveTodos = ({ todos }: IStore) =>
    todos?.filter(todo => !todo.isComplete) ?? [];
