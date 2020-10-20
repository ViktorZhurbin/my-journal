import React from 'react';

import { ITodo } from '../../models';
import { AddTodo } from '../../components/Todo/AddTodo';
import { DraggableTodoList } from './DraggableTodoList';
import styles from './TodoList.module.css';

interface ITodoListProps {
    todos: [ITodo];
    createTodo: (value: string) => void;
    reorder: (reordered: ITodo[]) => void;
}

export const TodoList: React.FC<ITodoListProps> = ({
    todos,
    createTodo,
    reorder,
}) => {
    return (
        <div className={styles.container}>
            <DraggableTodoList todos={todos} onReorder={reorder} />
            <InputField onCreate={createTodo} />
        </div>
    );
};
