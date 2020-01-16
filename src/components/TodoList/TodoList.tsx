import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { todoAddAction } from '~/store/todos/actions';
import { selectTodos } from '~/store/todos/selectors';

import styles from './TodoList.module.css';

const cx = classNames.bind(styles);

export const TodoList: React.FC = () => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();

    const addTodo = useCallback(
        (task: string) => dispatch(todoAddAction(task)),
        [dispatch]
    );

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={addTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section>
                <ul className={styles.list}>
                    {todos &&
                        todos.map(todo => <Todo key={todo.id} todo={todo} />)}
                </ul>
            </section>
        </div>
    );
};
