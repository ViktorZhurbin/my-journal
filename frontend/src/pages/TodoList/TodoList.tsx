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
    reorderCompleted: (reordered: ITodo[]) => void;
    reorderActive: (reordered: ITodo[]) => void;
    active: [ITodo];
    completed: [ITodo];
}

export const TodoList: React.FC<ITodoListProps> = ({
    createTodo,
    active,
    completed,
    reorderCompleted,
    reorderActive,
}) => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);
    const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    const completeItemsText =
        completed &&
        `${completed.length} Completed ${
            completed.length > 1 ? 'items' : 'item'
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
                    todos={active}
                    onReorder={reorderActive}
                    classNames={cx('list')}
                />
            </section>
            {completed?.length ? (
                <section className={cx('completed', { isCompletedHidden })}>
                    {active?.length ? <hr /> : null}
                    <div
                        className={cx('numCompletedText')}
                        onClick={toggleCompleteHidden}
                    >
                        <div className={cx('toggleComplete')} />
                        {completeItemsText}
                    </div>
                    <ul className={cx('list')}>
                        <DraggableTodoList
                            todos={completed}
                            onReorder={reorderCompleted}
                            classNames={cx('list')}
                        />
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
