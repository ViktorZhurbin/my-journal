import React, { useState } from 'react';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';

import styles from './TodoList.module.css';
import { ITodo } from '~/models';
import { DraggableTodoList } from './DraggableTodoList';

const cx = classNames.bind(styles);

interface ITodoListProps {
    createTodo: (value: string) => void;
    reorderTodos: (reorderedActiveTodos: ITodo[]) => void;
    todos: {
        all: [ITodo];
        active: [ITodo];
        completed: [ITodo];
    };
}

export const TodoList: React.FC<ITodoListProps> = ({
    createTodo,
    todos,
    reorderTodos,
}) => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);
    const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    const completeItemsText =
        todos &&
        todos.completed &&
        `${todos.completed.length} Completed ${
            todos.completed.length > 1 ? 'items' : 'item'
        }`;

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={createTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section className={cx('active')}>
                <DraggableTodoList
                    todos={todos.active}
                    onReorder={reorderTodos}
                    classNames={cx('list')}
                />
            </section>
            {todos.completed?.length ? (
                <section className={cx('completed', { isCompletedHidden })}>
                    {todos.active?.length ? <hr /> : null}
                    <div
                        className={cx('numCompletedText')}
                        onClick={toggleCompleteHidden}
                    >
                        <div className={cx('toggleComplete')} />
                        {completeItemsText}
                    </div>
                    <ul className={cx('list')}>
                        {todos.completed?.map((todo: ITodo) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
