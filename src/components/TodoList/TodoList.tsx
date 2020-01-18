import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';
import { todoAddAction, todoListUpdateAction } from '~/store/todos/actions';
import {
    selectCompleteTodos,
    selectActiveTodos,
} from '~/store/todos/selectors';

import styles from './TodoList.module.css';
import { ITodo } from '~/models';
import { reorder } from '~/helpers';
import { DraggableTodoList } from './DraggableTodoList';

const cx = classNames.bind(styles);

export const TodoList: React.FC = () => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);

    const activeTodos = useSelector(selectActiveTodos);
    const completedTodos = useSelector(selectCompleteTodos);
    const dispatch = useDispatch();

    const addTodo = useCallback(
        (task: string) => dispatch(todoAddAction(task)),
        [dispatch]
    );

    const updateTodos = useCallback(
        (todos: ITodo[]) => dispatch(todoListUpdateAction(todos)),
        [dispatch]
    );

    const handleReorder = (reorderedActiveTodos: ITodo[]) =>
        updateTodos(reorderedActiveTodos.concat(completedTodos));

    const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    const completeItemsText =
        completedTodos &&
        `${completedTodos.length} Completed ${
            completedTodos.length > 1 ? 'items' : 'item'
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
                <DraggableTodoList
                    todos={activeTodos}
                    onReorder={handleReorder}
                    classNames={cx('list')}
                />
            </section>
            {completedTodos?.length ? (
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
                        {completedTodos?.map(todo => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
