const { DataSource } = require('apollo-datasource');
const { Op } = require('sequelize');

class TodoAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }

    async getAllTodos() {
        const all = await this.store.todos.findAll();
        const completed = await this.store.todos.findAll({
            where: {
                isComplete: {
                    [Op.eq]: true,
                },
            },
        });
        const active = await this.store.todos.findAll({
            where: {
                isComplete: {
                    [Op.eq]: false,
                },
            },
        });

        return {
            all,
            active,
            completed,
        };
    }

    async updateAllTodos({ todos }) {
        await this.store.todos.destroy({
            where: {
                id: {
                    [Op.ne]: null,
                },
            },
        });
        const created = await this.store.todos.bulkCreate(todos, {
            returning: true,
        });

        return created;
    }

    async toggleTodo({ id }) {
        const todo = await this.store.todos.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });
        todo.isComplete = !todo.isComplete;
        todo.save();

        return todo.dataValues;
    }

    async editTodo({ id, task }) {
        const todo = await this.store.todos.findOne({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });
        todo.task = task;
        todo.save();

        return todo.dataValues;
    }

    async deleteTodo({ id }) {
        await this.store.todos.destroy({
            where: {
                id: {
                    [Op.eq]: id,
                },
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
