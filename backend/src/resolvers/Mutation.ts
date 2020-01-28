import { MutationResolvers } from '../types';

const Mutation: MutationResolvers = {
    createTodo: async (_, { task }, { dataSources }) => {
        const data = await dataSources.todoAPI.createTodo({ task });

        return {
            success: true,
            message: 'todo added',
            data,
        };
    },

    deleteTodo: async (_, { id }, { dataSources }) => {
        const data = await dataSources.todoAPI.deleteTodo({ id });

        return {
            success: true,
            message: 'todo deleted',
            data,
        };
    },

    editTodo: async (_, { id, task }, { dataSources }) => {
        const data = await dataSources.todoAPI.editTodo({ id, task });

        return {
            success: true,
            message: 'todo edited',
            data,
        };
    },

    toggleTodo: async (_, { id }, { dataSources }) => {
        const data = await dataSources.todoAPI.toggleTodo({ id });

        return {
            success: true,
            message: 'todo toggled',
            data,
        };
    },

    updateAllTodos: async (_, { todos }, { dataSources }) => {
        await dataSources.todoAPI.updateAllTodos({ todos });
        const allTodos = await dataSources.todoAPI.getAllTodos();

        return {
            success: true,
            message: 'todos updated',
            data: {
                todos: allTodos,
            },
        };
    },
};

export { Mutation };
