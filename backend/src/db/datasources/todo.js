const { Op, DataSource } = require('apollo-datasource');

class TodoAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    async getAllTodos() {
        const todos = await this.store.todos.findAll();

        return Array.isArray(todos) ? todos : [];
    }

    async toggleTodo({ id }) {
        const todo = await this.store.todos.findOne({
            where: {
                id: id,
            },
        });
        todo.isComplete = !todo.isComplete;
        todo.save();

        return todo.dataValues;
    }

    async editTodo({ id, task }) {
        const todo = await this.store.todos.findOne({
            where: {
                id: id,
            },
        });
        todo.task = task;
        todo.save();

        return todo.dataValues;
    }

    async deleteTodo({ id }) {
        const todo = await this.store.todos.destroy({
            where: {
                id: id,
            },
        });

        return id;
    }

    async createTodo({ task }) {
        const todo = await this.store.todos.create({
            task,
            isComplete: false,
        });

        return todo;
    }
}

module.exports = TodoAPI;
