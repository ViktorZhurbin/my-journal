import { QueryResolvers } from '../types';

const Query: QueryResolvers = {
    todos: (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos(),
};

export { Query };
