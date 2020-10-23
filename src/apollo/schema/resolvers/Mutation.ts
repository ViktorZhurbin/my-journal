import { MutationResolvers } from '../../../@types/qraphql';

export const Mutation: MutationResolvers = {
    createTodo: async (_, { task }, { models }) => {
        const data = await models.todoModel.create({
            task,
        });

        return {
            success: true,
            data,
        };
    },

    deleteTodo: async (_, { id }, { models }) => {
        const dbResponse = await models.todoModel.deleteOne({ id });

        return {
            success: dbResponse?.deletedCount === 1,
            data: {
                id,
            },
        };
    },

    deleteAllTodos: async (_, __, { models }) => {
        await models.todoModel.deleteMany({});

        return {
            success: true,
        };
    },

    editTodo: async (_, { id, task }, { models }) => {
        const data = await models.todoModel.findOneAndUpdate(
            { id },
            { task },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    },

    toggleTodo: async (_, { id, isComplete }, { models }) => {
        const data = await models.todoModel.findOneAndUpdate(
            { id },
            { isComplete: !isComplete },
            { new: true } /* Return updated object */
        );

        return {
            success: true,
            data,
        };
    },

    updateAllTodos: async (_, { todos: newTodos }, { models }) => {
        await models.todoModel.deleteMany({});
        const todos = await models.todoModel.insertMany(newTodos);

        return {
            success: true,
            data: { todos },
        };
    },
};
