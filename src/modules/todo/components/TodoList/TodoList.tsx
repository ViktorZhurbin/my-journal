import React from 'react';

import { AddTodo } from '../AddTodo';
import { DraggableTodoList } from '../DraggableTodoList';

import { useData } from '~/hooks/useData';
import { ITodo } from '../../types';

import styles from './TodoList.module.css';

export const TodoList: React.FC<{ todos: ITodo[] }> = () => {
    const { data, isLoading, isError } = useData('/api/getTodos');

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>ERROR!</span>;
    }

    return (
        <div className={styles.container}>
            {/* <button onClick={() => Todo.deleteAllTodos()}>Delete All</button> */}
            <DraggableTodoList todos={data} />
            <AddTodo />
        </div>
    );
};
