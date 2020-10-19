import { MutationResolvers } from '../types';

const Mutation: MutationResolvers = {
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
        const { deletedCount } = await models.todoModel.deleteOne({ id });

        return {
            success: deletedCount === 1,
        };
    },

    editTodo: async (_, { id, task }, { models }) => {
        const data = await models.todoModel.findOneAndUpdate(
            { id },
            { task },
            { new: true } /* Return object *after* update */
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
            { new: true } /* Return object *after* update */
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

export { Mutation };
