import React from 'react';

import styles from './TodoList.module.css';

import { ITodo } from '~/models';
import { DraggableTodoList } from './DraggableTodoList';
import { InputField } from '~/components/Todo/InputField/InputField';

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
