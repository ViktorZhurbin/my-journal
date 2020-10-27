import { ITodo } from '../@types';
import { fetcher } from '../../../utils/fetcher';

export const updateAllTodos = (updatedTodos: ITodo[]): Promise<void> =>
    fetcher('/api/todo/updateAll', 'POST', { updatedTodos });

export const createTodo = (task: string): Promise<void> =>
    fetcher('/api/todo/create', 'POST', { task });

export const toggleTodo = ({ _id: id, isComplete }: ITodo): Promise<void> =>
    fetcher('/api/todo/toggle', 'PUT', { id, isComplete });

export const editTodo = ({ _id: id, task }: ITodo): Promise<void> =>
    fetcher('/api/todo/edit', 'PUT', { id, task });

export const deleteTodo = (id: string): Promise<void> =>
    fetcher('/api/todo/delete', 'DELETE', { id });
