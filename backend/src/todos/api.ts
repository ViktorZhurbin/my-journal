import { DataSource } from 'apollo-datasource';
import { Op } from 'sequelize';
import { IStore } from '../@types';
import { ITodo } from '../@types/Todo';

class TodoAPI extends DataSource {
    store: IStore;
    constructor({ store }: any) {
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

    async updateAllTodos({ todos }: { todos: ITodo[] }) {
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

    async toggleTodo({ id }: Partial<ITodo>) {
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

    async editTodo({ id, task }: Partial<ITodo>) {
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

    async deleteTodo({ id }: Partial<ITodo>) {
        await this.store.todos.destroy({
            where: {
                id: {
                    [Op.eq]: id,
                },
            },
        });

        return id;
    }

    async createTodo({ task }: Partial<ITodo>) {
        const todo = await this.store.todos.create({
            task,
            isComplete: false,
        });

        return todo;
    }
}

export { TodoAPI };
