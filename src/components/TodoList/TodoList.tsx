import React, { useCallback } from 'react';
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
    const activeTodos = useSelector(selectActiveTodos);
    const completeTodos = useSelector(selectCompleteTodos);
    const dispatch = useDispatch();

    const addTodo = useCallback(
        (task: string) => dispatch(todoAddAction(task)),
        [dispatch]
    );

    const completeItemsText =
        completeTodos &&
        `${completeTodos.length} Completed item${
            completeTodos.length > 1 ? 's' : ''
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
                <section className={cx('completed')}>
                    {activeTodos?.length ? <hr /> : null}
                    <div className={cx('numCompletedText')}>
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
