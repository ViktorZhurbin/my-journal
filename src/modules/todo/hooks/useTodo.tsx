// import { Todo } from '../../../apollo/models';
import mongoose from 'mongoose';
import { ITodo } from '../types';

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
        if (!task) {
            return;
        }

        const data = await mongoose.models.Todo.create({ task });

        return {
            success: true,
            data,
        };
    };

    const toggleTodo = async ({ id, isComplete }: ITodo) => {
        const data = await mongoose.models.Todo.findOneAndUpdate(
            { id },
            { isComplete: !isComplete },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    };

    const editTodo = async ({ id, task }: ITodo) => {
        const data = await mongoose.models.Todo.findOneAndUpdate(
            { id },
            { task },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    };

    const deleteTodo = async (id: string) => {
        const dbResponse = await mongoose.models.Todo.deleteOne({ id });

        return {
            success: dbResponse?.deletedCount === 1,
            data: {
                id,
            },
        };
    };

    return {
        createTodo,
        toggleTodo,
        editTodo,
        deleteTodo,
        updateAllTodos,
    };
};
