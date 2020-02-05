import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';

import styles from './TodoList.module.css';
import { ITodo } from '~/models';
import { DraggableTodoList } from './DraggableTodoList';

const cx = classNames.bind(styles);

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
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={createTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <DraggableTodoList todos={todos} onReorder={reorder} />
        </div>
    );
};
