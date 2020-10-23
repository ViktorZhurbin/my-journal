import * as React from 'react';
import mongoose from 'mongoose';
import { resetServerContext } from 'react-beautiful-dnd';

import { TodoList as Component } from '../modules/todo/pages/TodoList';
import { initDb } from '~/utils/initDb';
import { ITodo } from '~/modules/todo/types';

const TodoList: React.FC<{ todos: ITodo[] }> = ({ todos }) => (
    <Component todos={todos} />
);

export async function getStaticProps() {
    resetServerContext();

    try {
        await initDb();

        const result = await mongoose.models.Todo.find({});
        const todos = result.map((doc) => {
            const todo = doc.toObject();
            todo._id = todo._id.toString();

            return todo;
        });

        return { props: { todos } };
    } catch (error) {
        console.error('getTodos error', error);
    }
}

export default TodoList;
