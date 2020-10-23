import * as React from 'react';
import mongoose from 'mongoose';
import { TodoList as Component } from '../modules/todo/pages/TodoList';
import { initDb } from '~/apollo/initDb';

const TodoList = ({ todos }) => <Component todos={todos} />;

export async function getStaticProps(context) {
    console.log('context', context);
    try {
        console.log('Log');
        await initDb();
        const result = await mongoose.models.Todo.find({});
        console.log('result', result);
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
