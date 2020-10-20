import React from 'react';

import { ITodo } from '../../models';
import { AddTodo } from '../../components/AddTodo';
import { DraggableTodoList } from './DraggableTodoList';
import styles from './TodoList.module.css';

interface ITodoListProps {
    todos: [ITodo];
    reorder: (reordered: ITodo[]) => void;
}

export const TodoList: React.FC<ITodoListProps> = ({ todos, reorder }) => {
    return (
        <div className={styles.container}>
            <DraggableTodoList todos={todos} onReorder={reorder} />
            <AddTodo />
        </div>
    );
};
