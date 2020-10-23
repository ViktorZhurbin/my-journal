import mongoose from 'mongoose';
import { QueryResolvers } from '../../../@types/qraphql';

export const Query: QueryResolvers = {
    todos: async (_, __, { models }) => {
        console.log('Log', mongoose.modelNames());
        console.log('Log', mongoose.model('TodoModel'));
        console.log('Log', mongoose.model('todoModel'));
        const todos = await mongoose.models.todoModel.find({});

        return todos;
    },
};
