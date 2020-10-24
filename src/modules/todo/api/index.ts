import { ITodo } from '../types';

const contentType = 'application/json';
const headers = {
    Accept: contentType,
    'Content-Type': contentType,
};

const fetcher = async (
    endpoint: string,
    method: string,
    payload: { [key: string]: any }
) => {
    try {
        const res = await fetch(endpoint, {
            method,
            headers,
            body: JSON.stringify({ ...payload }),
        });
        if (!res.ok) {
            throw new Error(`${res.status}`);
        }
    } catch (error) {
        console.error(`Request failed with status code ${error.message}`);
    }
};

export const updateAllTodos = (updatedTodos: ITodo[]): Promise<void> =>
    fetcher('/api/updateAllTodos', 'POST', { updatedTodos });

export const createTodo = (task: string): Promise<void> =>
    fetcher('/api/createTodo', 'POST', { task });

export const toggleTodo = ({ _id: id, isComplete }: ITodo): Promise<void> =>
    fetcher('/api/toggleTodo', 'PUT', { id, isComplete });

export const editTodo = ({ _id: id, task }: ITodo): Promise<void> =>
    fetcher('/api/editTodo', 'PUT', { id, task });

export const deleteTodo = (id: string): Promise<void> =>
    fetcher('/api/deleteTodo', 'DELETE', { id });
