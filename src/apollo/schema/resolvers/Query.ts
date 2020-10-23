import mongoose from 'mongoose';
import { QueryResolvers } from '../../../@types/qraphql';

export const Query: QueryResolvers = {
    todos: async () => {
        const todos = await mongoose.models.TodoModel.find({});

        return todos;
    },
};
