import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { CREATE_TODO, GET_TODOS, UPDATE_ALL_TODOS } from '~/graphql';
import { Todo } from '~/components/Todo';
import { Input } from '~/components/Input';

import styles from './TodoList.module.css';
import { ITodo } from '~/models';
import { DraggableTodoList } from './DraggableTodoList';

const cx = classNames.bind(styles);

export const TodoList: React.FC = () => {
    const [isCompletedHidden, setIsCompletedHidden] = useState(false);

    const { data, loading, error } = useQuery(GET_TODOS);

    const [createTodo] = useMutation(CREATE_TODO);
    const handleCreateTodo = (task: string) =>
        createTodo({
            variables: { task },
            refetchQueries: [{ query: GET_TODOS }],
        });

    const [updateAllTodos] = useMutation(UPDATE_ALL_TODOS);
    const handleReorderTodos = useCallback(
        (reorderedActiveTodos: ITodo[]) => {
            const allTodos = reorderedActiveTodos.concat(data.todos.completed);
            const todos = allTodos.map(({ id, task, isComplete }) => ({
                id,
                task,
                isComplete,
            }));
            return updateAllTodos({
                variables: { todos },
                refetchQueries: [{ query: GET_TODOS }],
            });
        },
        [data]
    );

    const toggleCompleteHidden = () => setIsCompletedHidden(!isCompletedHidden);

    const completeItemsText =
        data &&
        data.todos.completed &&
        `${data.todos.completed.length} Completed ${
            data.todos.completed.length > 1 ? 'items' : 'item'
        }`;

    if (loading || !data) return <p>Loading...</p>;
    if (error) return <p>ERROR</p>;

    return (
        <div className={styles.container}>
            <header>
                <Input
                    placeholder="What needs to be done?"
                    onSubmit={handleCreateTodo}
                    classNames={cx('inputTodo')}
                />
            </header>
            <section className={cx('active')}>
                <DraggableTodoList
                    todos={data.todos.active}
                    onReorder={handleReorderTodos}
                    classNames={cx('list')}
                />
            </section>
            {data.todos.completed?.length ? (
                <section className={cx('completed', { isCompletedHidden })}>
                    {data.todos.active?.length ? <hr /> : null}
                    <div
                        className={cx('numCompletedText')}
                        onClick={toggleCompleteHidden}
                    >
                        <div className={cx('toggleComplete')} />
                        {completeItemsText}
                    </div>
                    <ul className={cx('list')}>
                        {data.todos.completed?.map((todo: ITodo) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </ul>
                </section>
            ) : null}
        </div>
    );
};
