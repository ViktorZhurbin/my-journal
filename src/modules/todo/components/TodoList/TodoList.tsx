import React from 'react';

import { AddTodo } from '../AddTodo';
import { DraggableTodoList } from '../DraggableTodoList';

import { ITodo } from '../../types';

import styles from './TodoList.module.css';

export const TodoList: React.FC<{ todos: ITodo[] }> = ({ todos }) => {
    return (
        <div className={styles.container}>
            {/* <button onClick={() => Todo.deleteAllTodos()}>Delete All</button> */}
            <DraggableTodoList todos={todos} />
            <AddTodo />
        </div>
    );
};
