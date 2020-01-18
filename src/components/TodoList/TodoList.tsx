import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { todoAddAction } from '~/store/todos/actions';
import {
    selectCompleteTodos,
    selectActiveTodos,
} from '~/store/todos/selectors';

import styles from './TodoList.module.css';

const cx = classNames.bind(styles);

export const TodoList: React.FC = () => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);

    const activeTodos = useSelector(selectActiveTodos);
    const completeTodos = useSelector(selectCompleteTodos);
    const dispatch = useDispatch();

    const addTodo = useCallback(
        (task: string) => dispatch(todoAddAction(task)),
        [dispatch]
    );

    const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    const completeItemsText =
        completeTodos &&
        `${completeTodos.length} Completed ${
            completeTodos.length > 1 ? 'items' : 'item'
        }`;

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={addTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section className={cx('active')}>
                <ul className={cx('list')}>
                    {activeTodos?.map(todo => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </ul>
            </section>
            {completeTodos?.length ? (
                <section className={cx('completed', { isCompletedHidden })}>
                    {activeTodos?.length ? <hr /> : null}
                    <div
                        className={cx('numCompletedText')}
                        onClick={toggleCompleteHidden}
                    >
                        <div className={cx('toggleComplete')} />
                        {completeItemsText}
                    </div>
                    <ul className={cx('list')}>
                        {completeTodos?.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
