import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AddTodo } from '../../components/AddTodo';
import { DELETE_ALL_TODOS, GET_TODOS } from '../../resolvers';
import { DraggableTodoList } from '../../components/DraggableTodoList';
import styles from './TodoList.module.css';

export const TodoList: React.FC = () => {
    const { data, loading, error } = useQuery(GET_TODOS);
    const [deleteAllTodos] = useMutation(DELETE_ALL_TODOS);

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <div className={styles.container}>
            <button onClick={() => deleteAllTodos()}>Delete All</button>
            <DraggableTodoList todos={data.todos} />
            <AddTodo />
        </div>
    );
};
