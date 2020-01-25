const Query = {
    todos: (_, __, { dataSources }) => dataSources.todoAPI.getAllTodos(),
};

module.exports = Query;
