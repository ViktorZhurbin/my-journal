import React from 'react';

import { useData } from '@/hooks/useData';
import { AddTodo } from '../AddTodo';
import { DraggableTodoList } from '../DraggableTodoList';
import styles from './TodoList.module.css';

export const TodoList: React.FC = () => {
    const { data, isLoading, isError } = useData('/api/todo/get');

    if (isLoading) {
        return <span>Loading...</span>;
    }
    if (isError) {
        return <span>ERROR!</span>;
    }

    return (
        <div className={styles.container}>
            {/* <button onClick={() => Todo.deleteAllTodos()}>Delete All</button> */}
            <h2 className={styles.title}>Today's Tasks</h2>
            <DraggableTodoList todos={data} />
            <AddTodo />
        </div>
    );
};
