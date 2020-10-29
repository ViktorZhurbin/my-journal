import { Todo } from '../@types';
import { fetcher } from '@/utils/fetcher';
import { ResponseData } from '../@types/ResponseData';

export const updateAllTodos = (updatedTodos: Todo[]): Promise<ResponseData> =>
    fetcher('/api/todo/updateAll', 'POST', { updatedTodos });

export const createTodo = (task: string): Promise<ResponseData> =>
    fetcher('/api/todo/create', 'POST', { task });

export const toggleTodo = ({
    _id: id,
    isComplete,
}: Todo): Promise<ResponseData> =>
    fetcher('/api/todo/toggle', 'PUT', { id, isComplete });

export const editTodo = ({ _id: id, task }: Todo): Promise<ResponseData> =>
    fetcher('/api/todo/edit', 'PUT', { id, task });

export const deleteTodo = (id: string): Promise<ResponseData> =>
    fetcher('/api/todo/delete', 'DELETE', { id });
