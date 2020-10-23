import mongoose from 'mongoose';

import { MutationResolvers } from '../../../@types/qraphql';

export const Mutation: MutationResolvers = {
    createTodo: async (_, { task }) => {
        const data = await mongoose.models.TodoModel.create({
            task,
        });

        return {
            success: true,
            data,
        };
    },

    deleteTodo: async (_, { id }) => {
        const dbResponse = await mongoose.models.TodoModel.deleteOne({ id });

        return {
            success: dbResponse?.deletedCount === 1,
            data: {
                id,
            },
        };
    },

    deleteAllTodos: async (_, __) => {
        await mongoose.models.TodoModel.deleteMany({});

        return {
            success: true,
        };
    },

    editTodo: async (_, { id, task }) => {
        const data = await mongoose.models.TodoModel.findOneAndUpdate(
            { id },
            { task },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    },

    toggleTodo: async (_, { id, isComplete }) => {
        const data = await mongoose.models.TodoModel.findOneAndUpdate(
            { id },
            { isComplete: !isComplete },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    },

    updateAllTodos: async (_, { todos: newTodos }) => {
        await mongoose.models.TodoModel.deleteMany({});
        const todos = await mongoose.models.TodoModel.insertMany(newTodos);

        return {
            success: true,
            data: { todos },
        };
    },
};
