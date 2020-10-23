import mongoose from 'mongoose';
import { Todo } from '../../../models/Todo';
import { ITodo } from '../types';

const contentType = 'application/json';

export const useTodo = () => {
    const updateAllTodos = async (updatedTodos: ITodo[]) => {
        await mongoose.models.Todo.deleteMany({});
        const data = await mongoose.models.Todo.insertMany(updatedTodos);

        return {
            success: true,
            data,
        };
    };

    const createTodo = async (task: string) => {
        try {
            const res = await fetch('/api/createTodo', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({ task }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('Failed to add task');
        }
    };

    const toggleTodo = async ({ _id, isComplete }: ITodo) => {
        const data = await mongoose.models.Todo.findOneAndUpdate(
            { _id },
            { isComplete: !isComplete },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    };

    const editTodo = async ({ _id, task }: ITodo) => {
        const data = await mongoose.models.Todo.findOneAndUpdate(
            { _id },
            { task },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    };

    const deleteTodo = async (id: string) => {
        try {
            const res = await fetch('/api/deleteTodo', {
                method: 'DELETE',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({ id }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(`${res.status}`);
            }
        } catch (error) {
            console.error('Failed to delete task');
        }
    };

    return {
        createTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        updateAllTodos,
    };
};
