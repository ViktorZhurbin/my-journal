import { MutationResolvers, Todo } from '../types';

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
        await models.todoModel.deleteOne({ id });

        return {
            success: true,
        };
    },

    editTodo: async (_, { id, task }, { models }) => {
        const data = await models.todoModel.findOneAndUpdate({ id }, { task });

        return {
            success: true,
            data,
        };
    },

    toggleTodo: async (_, { id }, { models }) => {
        const todo = await models.todoModel.findOne({ id });
        const data = await models.todoModel.findOneAndUpdate(
            { id },
            { isComplete: !todo.isComplete }
        );

        return {
            success: true,
            data,
        };
    },

    updateAllTodos: async (_, { todos }, { models }) => {
        await models.todoModel.deleteMany({});
        await models.todoModel.insertMany(todos);
        const allTodos: Todo[] = await models.todoModel.find({});

        const completed = allTodos.filter(item => item.isComplete);
        const active = allTodos.filter(item => !item.isComplete);

        return {
            success: true,
            data: {
                todos: {
                    all: allTodos,
                    completed,
                    active,
                },
            },
        };
    },
};

export { Mutation };