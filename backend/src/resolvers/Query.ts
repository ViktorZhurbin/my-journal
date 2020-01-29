import { QueryResolvers } from '../types';
import { ITodo } from '../@types/Todo';

const Query: QueryResolvers = {
    todos: async (_, __, { models }) => {
        const all: ITodo[] = await models.todoModel.find({});
        const completed = all.filter(item => item.isComplete);
        const active = all.filter(item => !item.isComplete);

        return { all, completed, active };
    },
};

export { Query };
